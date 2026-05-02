import { and, eq, isNull, sql } from "drizzle-orm";
import type Stripe from "stripe";
import { db, intakeSubmissionsTable } from "@workspace/db";
import { getStripeSync } from "./stripeClient";
import { sendTeamIntakeEmail, sendClientConfirmationEmail } from "./intake-emails";
import { logger } from "./logger";

/**
 * Process a Stripe webhook delivery:
 *  - Hand the raw payload + signature to `stripe-replit-sync` for signature
 *    validation and built-in DB sync (products / prices / customers /
 *    subscriptions / invoices upserted into the local stripe schema).
 *  - On success, JSON-parse the payload (already validated) and run our
 *    own side-effects for `invoice.paid` (send the two confirmation emails
 *    once per submission). Email sends are claimed atomically via a
 *    conditional UPDATE so concurrent webhook deliveries can never send
 *    the same email twice.
 *
 * Throws on signature failure; the route handler should respond 400.
 */
export async function handleStripeWebhook(payload: Buffer, signature: string): Promise<void> {
  if (!Buffer.isBuffer(payload)) {
    throw new Error(
      "Stripe webhook payload must be a Buffer. " +
        "Ensure the webhook route is registered BEFORE express.json().",
    );
  }

  const sync = await getStripeSync();
  await sync.processWebhook(payload, signature);

  let event: Stripe.Event;
  try {
    event = JSON.parse(payload.toString("utf8")) as Stripe.Event;
  } catch (err) {
    logger.error({ err }, "Stripe webhook payload was not valid JSON after sync.processWebhook");
    return;
  }

  // Both event types fire on first paid invoice. We treat them
  // identically — the atomic claim below makes double-firing safe.
  if (event.type !== "invoice.paid" && event.type !== "invoice.payment_succeeded") {
    return;
  }

  const invoice = event.data.object as Stripe.Invoice;
  const subscriptionId =
    typeof invoice.subscription === "string"
      ? invoice.subscription
      : invoice.subscription?.id ?? null;

  if (!subscriptionId) return;

  const [submission] = await db
    .select()
    .from(intakeSubmissionsTable)
    .where(eq(intakeSubmissionsTable.stripeSubscriptionId, subscriptionId))
    .limit(1);

  if (!submission) {
    logger.info({ subscriptionId }, "Webhook invoice.paid for unknown submission — skipping");
    return;
  }

  const invoiceContext = {
    amountPaidCents: invoice.amount_paid ?? 0,
    invoiceNumber: invoice.number ?? null,
    invoiceUrl: invoice.hosted_invoice_url ?? null,
  };

  // Mark the submission active on first paid invoice. This is an
  // unconditional update because it's safe to set repeatedly.
  await db
    .update(intakeSubmissionsTable)
    .set({ status: "active", updatedAt: sql`NOW()` })
    .where(eq(intakeSubmissionsTable.id, submission.id));

  // ATOMIC CLAIM: try to take responsibility for the team email by
  // flipping team_email_sent_at from NULL → NOW() in a single UPDATE.
  // If the update returns 0 rows, another webhook delivery already sent
  // it. If sending then fails, we reset the column back to NULL so the
  // next delivery can retry.
  const teamClaim = await db
    .update(intakeSubmissionsTable)
    .set({ teamEmailSentAt: sql`NOW()` })
    .where(
      and(
        eq(intakeSubmissionsTable.id, submission.id),
        isNull(intakeSubmissionsTable.teamEmailSentAt),
      ),
    )
    .returning({ id: intakeSubmissionsTable.id });

  if (teamClaim.length > 0) {
    try {
      await sendTeamIntakeEmail(submission, invoiceContext);
      logger.info({ submissionId: submission.id }, "Sent team intake email");
    } catch (err) {
      logger.error({ err, submissionId: submission.id }, "Team intake email failed — releasing claim for retry");
      await db
        .update(intakeSubmissionsTable)
        .set({ teamEmailSentAt: null })
        .where(eq(intakeSubmissionsTable.id, submission.id));
    }
  } else {
    logger.info({ submissionId: submission.id }, "Team email already claimed by another delivery");
  }

  const clientClaim = await db
    .update(intakeSubmissionsTable)
    .set({ clientEmailSentAt: sql`NOW()` })
    .where(
      and(
        eq(intakeSubmissionsTable.id, submission.id),
        isNull(intakeSubmissionsTable.clientEmailSentAt),
      ),
    )
    .returning({ id: intakeSubmissionsTable.id });

  if (clientClaim.length > 0) {
    try {
      await sendClientConfirmationEmail(submission, invoiceContext);
      logger.info({ submissionId: submission.id }, "Sent client confirmation email");
    } catch (err) {
      logger.error(
        { err, submissionId: submission.id },
        "Client confirmation email failed — releasing claim for retry",
      );
      await db
        .update(intakeSubmissionsTable)
        .set({ clientEmailSentAt: null })
        .where(eq(intakeSubmissionsTable.id, submission.id));
    }
  } else {
    logger.info({ submissionId: submission.id }, "Client email already claimed by another delivery");
  }

  // Roll-up marker: only set emails_sent_at once both have shipped.
  await db
    .update(intakeSubmissionsTable)
    .set({ emailsSentAt: sql`NOW()` })
    .where(
      and(
        eq(intakeSubmissionsTable.id, submission.id),
        isNull(intakeSubmissionsTable.emailsSentAt),
        sql`${intakeSubmissionsTable.teamEmailSentAt} IS NOT NULL`,
        sql`${intakeSubmissionsTable.clientEmailSentAt} IS NOT NULL`,
      ),
    );
}

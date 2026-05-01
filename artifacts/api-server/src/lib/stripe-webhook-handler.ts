import { eq, sql } from "drizzle-orm";
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
 *    once per submission).
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

  if (submission.emailsSentAt) {
    logger.info({ submissionId: submission.id }, "Confirmation emails already sent — skipping");
    return;
  }

  const invoiceContext = {
    amountPaidCents: invoice.amount_paid ?? 0,
    invoiceNumber: invoice.number ?? null,
    invoiceUrl: invoice.hosted_invoice_url ?? null,
  };

  try {
    await sendTeamIntakeEmail(submission, invoiceContext);
  } catch (err) {
    logger.error({ err, submissionId: submission.id }, "Failed to send team intake email");
  }
  try {
    await sendClientConfirmationEmail(submission, invoiceContext);
  } catch (err) {
    logger.error({ err, submissionId: submission.id }, "Failed to send client confirmation email");
  }

  await db
    .update(intakeSubmissionsTable)
    .set({
      status: "active",
      emailsSentAt: new Date(),
      updatedAt: sql`NOW()`,
    })
    .where(eq(intakeSubmissionsTable.id, submission.id));
}

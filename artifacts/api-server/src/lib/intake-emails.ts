import { getUncachableGmailClient, clearGmailTokenCache } from "./gmail";
import { logger } from "./logger";
import type { IntakeSubmission } from "@workspace/db";

const TEAM_EMAIL = "team@sntlabs.io";
const FROM_DISPLAY = "Sentinel Counsel <team@sntlabs.io>";

function encode(raw: string): string {
  return Buffer.from(raw)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

async function sendWithRetry(rawEncoded: string): Promise<void> {
  let gmail = await getUncachableGmailClient();
  try {
    await gmail.users.messages.send({
      userId: "me",
      requestBody: { raw: rawEncoded },
    });
  } catch (firstErr: unknown) {
    const code = (firstErr as { code?: number })?.code;
    if (code === 401 || code === 403) {
      logger.warn("Gmail token expired, retrying with fresh token");
      clearGmailTokenCache();
      gmail = await getUncachableGmailClient();
      await gmail.users.messages.send({
        userId: "me",
        requestBody: { raw: rawEncoded },
      });
    } else {
      throw firstErr;
    }
  }
}

function fmtMoney(cents: number): string {
  return `$${(cents / 100).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}

interface InvoiceContext {
  amountPaidCents: number;
  invoiceNumber: string | null;
  invoiceUrl: string | null;
}

export async function sendTeamIntakeEmail(
  submission: IntakeSubmission,
  invoice: InvoiceContext,
): Promise<void> {
  const subject = `New signup: ${submission.firmName} — ${submission.licenseCount} licenses (${submission.contractLength})`;

  const userList = submission.authorizedUsers
    .map((u, i) => `  ${i + 1}. ${u.name} <${u.email}>`)
    .join("\n");

  const lines = [
    `New paid signup from ${submission.firmName}`,
    ``,
    `--- BILLING ---`,
    `First invoice paid: ${fmtMoney(invoice.amountPaidCents)}`,
    invoice.invoiceNumber ? `Invoice #: ${invoice.invoiceNumber}` : null,
    invoice.invoiceUrl ? `Invoice URL: ${invoice.invoiceUrl}` : null,
    `Stripe Customer: ${submission.stripeCustomerId ?? "(missing)"}`,
    `Stripe Subscription: ${submission.stripeSubscriptionId ?? "(missing)"}`,
    `Stripe Price: ${submission.stripePriceId ?? "(missing)"}`,
    ``,
    `--- FIRM ---`,
    `Firm: ${submission.firmName}`,
    `Licenses: ${submission.licenseCount}`,
    `Contract length: ${submission.contractLength}`,
    submission.ein ? `EIN: ${submission.ein}` : null,
    ``,
    `--- BILLING ADDRESS ---`,
    submission.billingStreet,
    `${submission.billingCity}, ${submission.billingState} ${submission.billingZip}`,
    submission.billingCountry,
    ``,
    `--- PRIMARY CONTACT ---`,
    `${submission.primaryContactName}, ${submission.primaryContactTitle}`,
    `Email: ${submission.primaryContactEmail}`,
    `Phone: ${submission.primaryContactPhone}`,
    ``,
    submission.billingContactName || submission.billingContactEmail
      ? `--- BILLING CONTACT ---\n${submission.billingContactName ?? ""} <${submission.billingContactEmail ?? ""}>\n`
      : null,
    `--- AUTHORIZED USERS (${submission.authorizedUsers.length}) ---`,
    userList,
    ``,
    submission.referralSource ? `Heard about us: ${submission.referralSource}` : null,
    submission.notes ? `Notes:\n${submission.notes}` : null,
    ``,
    `Submission ID: ${submission.id}`,
    `Submitted: ${submission.createdAt.toISOString()}`,
  ]
    .filter((l) => l !== null)
    .join("\n");

  const raw = [
    `From: ${FROM_DISPLAY}`,
    `To: ${TEAM_EMAIL}`,
    `Subject: ${subject}`,
    `Content-Type: text/plain; charset="UTF-8"`,
    ``,
    lines,
  ].join("\r\n");

  await sendWithRetry(encode(raw));
  logger.info({ submissionId: submission.id }, "Sent team intake email");
}

export async function sendClientConfirmationEmail(
  submission: IntakeSubmission,
  invoice: InvoiceContext,
): Promise<void> {
  const subject = `Welcome to Sentinel Counsel — ${submission.firmName}`;

  const lines = [
    `${submission.primaryContactName},`,
    ``,
    `Thank you for choosing Sentinel Counsel. Your signup is complete and your`,
    `first quarterly invoice has been processed.`,
    ``,
    `--- ORDER SUMMARY ---`,
    `Firm: ${submission.firmName}`,
    `Licenses: ${submission.licenseCount}`,
    `Contract length: ${submission.contractLength === "1yr" ? "1 year" : "2 years (10% discount)"}`,
    `First quarterly charge: ${fmtMoney(invoice.amountPaidCents)}`,
    invoice.invoiceNumber ? `Invoice #: ${invoice.invoiceNumber}` : null,
    ``,
    `What happens next:`,
    `  1. A member of our onboarding team will reach out within one business`,
    `     day to schedule kickoff and provision accounts for your authorized`,
    `     users.`,
    `  2. You will receive a separately delivered Master Services Agreement`,
    `     to countersign for your records.`,
    `  3. Recurring quarterly invoices will be sent to the email on file.`,
    ``,
    `If you need anything in the meantime — billing changes, additional`,
    `seats, or onboarding questions — reply to this email or write to`,
    `${TEAM_EMAIL}.`,
    ``,
    `— The Sentinel Counsel team`,
    ``,
    `Reference: subscription ${submission.stripeSubscriptionId ?? ""}`,
  ]
    .filter((l) => l !== null)
    .join("\n");

  const raw = [
    `From: ${FROM_DISPLAY}`,
    `To: ${submission.primaryContactEmail}`,
    `Bcc: ${TEAM_EMAIL}`,
    `Subject: ${subject}`,
    `Content-Type: text/plain; charset="UTF-8"`,
    ``,
    lines,
  ].join("\r\n");

  await sendWithRetry(encode(raw));
  logger.info({ submissionId: submission.id }, "Sent client confirmation email");
}

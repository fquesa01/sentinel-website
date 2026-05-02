import { Router, type Request, type Response } from "express";
import { randomBytes, timingSafeEqual } from "node:crypto";
import { eq, sql } from "drizzle-orm";
import { db, intakeSubmissionsTable } from "@workspace/db";
import { getUncachableStripeClient, isStripeConfigured } from "../lib/stripeClient";
import { getStripeInitStatus } from "../lib/stripe-init";
import { logger } from "../lib/logger";

function generateSubmissionToken(): string {
  return randomBytes(24).toString("hex");
}

// Stripe requires ISO-3166-1 alpha-2; accept a few friendly aliases too.
const COUNTRY_NAME_TO_CODE: Record<string, string> = {
  "united states": "US",
  "united states of america": "US",
  "usa": "US",
  "u.s.": "US",
  "u.s.a.": "US",
  "canada": "CA",
  "united kingdom": "GB",
  "great britain": "GB",
  "uk": "GB",
  "australia": "AU",
  "ireland": "IE",
  "new zealand": "NZ",
};

function normalizeCountryCode(input: string): string {
  const trimmed = input.trim();
  if (/^[A-Za-z]{2}$/.test(trimmed)) return trimmed.toUpperCase();
  const mapped = COUNTRY_NAME_TO_CODE[trimmed.toLowerCase()];
  return mapped ?? trimmed;
}

function tokensMatch(a: string, b: string): boolean {
  if (typeof a !== "string" || typeof b !== "string") return false;
  if (a.length !== b.length) return false;
  try {
    return timingSafeEqual(Buffer.from(a), Buffer.from(b));
  } catch {
    return false;
  }
}

const router = Router();

const MIN_LICENSES = 10;
const ALLOWED_CONTRACTS = new Set(["1yr", "2yr"]);

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function s(v: unknown, max = 500): string {
  if (typeof v !== "string") return "";
  return v.replace(/[\r\n\t]/g, " ").trim().slice(0, max);
}

function sOpt(v: unknown, max = 500): string | null {
  const out = s(v, max);
  return out.length === 0 ? null : out;
}

interface IntakePayload {
  firmName: string;
  billingStreet: string;
  billingCity: string;
  billingState: string;
  billingZip: string;
  billingCountry: string;
  primaryContactName: string;
  primaryContactTitle: string;
  primaryContactEmail: string;
  primaryContactPhone: string;
  billingContactName?: string | null;
  billingContactEmail?: string | null;
  authorizedUsers: Array<{ name: string; email: string }>;
  licenseCount: number;
  contractLength: "1yr" | "2yr";
  ein?: string | null;
  referralSource?: string | null;
  notes?: string | null;
}

function parseAndValidate(body: unknown): { ok: true; data: IntakePayload } | { ok: false; error: string } {
  if (!body || typeof body !== "object") {
    return { ok: false, error: "Invalid request body" };
  }
  const b = body as Record<string, unknown>;

  const firmName = s(b["firmName"], 200);
  const billingStreet = s(b["billingStreet"], 300);
  const billingCity = s(b["billingCity"], 100);
  const billingState = s(b["billingState"], 100);
  const billingZip = s(b["billingZip"], 20);
  const billingCountry = normalizeCountryCode(s(b["billingCountry"], 80));
  const primaryContactName = s(b["primaryContactName"], 150);
  const primaryContactTitle = s(b["primaryContactTitle"], 150);
  const primaryContactEmail = s(b["primaryContactEmail"], 200);
  const primaryContactPhone = s(b["primaryContactPhone"], 50);

  if (!firmName) return { ok: false, error: "Firm name is required" };
  if (!billingStreet || !billingCity || !billingState || !billingZip || !billingCountry) {
    return { ok: false, error: "Complete billing address is required" };
  }
  if (!/^[A-Z]{2}$/.test(billingCountry)) {
    return { ok: false, error: "Billing country must be a 2-letter ISO code (e.g. US, CA, GB)" };
  }
  if (!primaryContactName || !primaryContactTitle || !primaryContactEmail || !primaryContactPhone) {
    return { ok: false, error: "Primary contact details are required" };
  }
  if (!isValidEmail(primaryContactEmail)) {
    return { ok: false, error: "Primary contact email is invalid" };
  }

  const licenseCount = Number(b["licenseCount"]);
  if (!Number.isInteger(licenseCount) || licenseCount < MIN_LICENSES) {
    return { ok: false, error: `Minimum of ${MIN_LICENSES} licenses required` };
  }
  if (licenseCount > 10000) {
    return { ok: false, error: "License count exceeds maximum allowed" };
  }

  const contractLength = s(b["contractLength"], 10);
  if (!ALLOWED_CONTRACTS.has(contractLength)) {
    return { ok: false, error: "Contract length must be 1yr or 2yr" };
  }

  const rawUsers = b["authorizedUsers"];
  if (!Array.isArray(rawUsers) || rawUsers.length === 0) {
    return { ok: false, error: "At least one authorized user is required" };
  }
  const authorizedUsers: Array<{ name: string; email: string }> = [];
  for (const u of rawUsers) {
    if (!u || typeof u !== "object") {
      return { ok: false, error: "Authorized users must be objects" };
    }
    const ur = u as Record<string, unknown>;
    const name = s(ur["name"], 150);
    const email = s(ur["email"], 200);
    if (!name || !email) continue;
    if (!isValidEmail(email)) {
      return { ok: false, error: `Authorized user email "${email}" is invalid` };
    }
    authorizedUsers.push({ name, email });
  }
  if (authorizedUsers.length === 0) {
    return { ok: false, error: "At least one valid authorized user is required" };
  }

  const billingContactEmail = sOpt(b["billingContactEmail"], 200);
  if (billingContactEmail && !isValidEmail(billingContactEmail)) {
    return { ok: false, error: "Billing contact email is invalid" };
  }

  return {
    ok: true,
    data: {
      firmName,
      billingStreet,
      billingCity,
      billingState,
      billingZip,
      billingCountry,
      primaryContactName,
      primaryContactTitle,
      primaryContactEmail,
      primaryContactPhone,
      billingContactName: sOpt(b["billingContactName"], 150),
      billingContactEmail,
      authorizedUsers,
      licenseCount,
      contractLength: contractLength as "1yr" | "2yr",
      ein: sOpt(b["ein"], 50),
      referralSource: sOpt(b["referralSource"], 200),
      notes: sOpt(b["notes"], 2000),
    },
  };
}

router.post("/intake", async (req: Request, res: Response) => {
  const parsed = parseAndValidate(req.body);
  if (!parsed.ok) {
    res.status(400).json({ error: parsed.error });
    return;
  }

  try {
    const submissionToken = generateSubmissionToken();
    const [row] = await db
      .insert(intakeSubmissionsTable)
      .values({
        firmName: parsed.data.firmName,
        billingStreet: parsed.data.billingStreet,
        billingCity: parsed.data.billingCity,
        billingState: parsed.data.billingState,
        billingZip: parsed.data.billingZip,
        billingCountry: parsed.data.billingCountry,
        primaryContactName: parsed.data.primaryContactName,
        primaryContactTitle: parsed.data.primaryContactTitle,
        primaryContactEmail: parsed.data.primaryContactEmail,
        primaryContactPhone: parsed.data.primaryContactPhone,
        billingContactName: parsed.data.billingContactName,
        billingContactEmail: parsed.data.billingContactEmail,
        authorizedUsers: parsed.data.authorizedUsers,
        licenseCount: parsed.data.licenseCount,
        contractLength: parsed.data.contractLength,
        ein: parsed.data.ein,
        referralSource: parsed.data.referralSource,
        notes: parsed.data.notes,
        status: "pending",
        submissionToken,
      })
      .returning();

    if (!row) {
      throw new Error("Insert returned no row");
    }

    res.json({ submissionId: row.id, submissionToken: row.submissionToken });
  } catch (err) {
    logger.error({ err }, "Failed to persist intake submission");
    res.status(500).json({ error: "Failed to save submission. Please try again." });
  }
});

interface PriceLookup {
  priceId: string;
  unitAmountCents: number;
}

async function findPriceForContract(
  contractLength: "1yr" | "2yr",
): Promise<PriceLookup> {
  const stripe = await getUncachableStripeClient();
  // Find the Sentinel Counsel product, then find an active price tagged
  // with the correct contract_length metadata. Using the live Stripe API
  // here (not the synced postgres copy) so this works even before
  // syncBackfill completes.
  const products = await stripe.products.search({
    query: `metadata['sku']:'sentinel_counsel_seat' AND active:'true'`,
  });
  if (products.data.length === 0) {
    throw new Error(
      "Sentinel Counsel product not found in Stripe. Run the seed-products script first.",
    );
  }
  const product = products.data[0]!;
  const prices = await stripe.prices.list({
    product: product.id,
    active: true,
    limit: 100,
  });
  const match = prices.data.find(
    (p) =>
      p.metadata?.["contract_length"] === contractLength &&
      p.recurring?.interval === "month" &&
      p.recurring?.interval_count === 3,
  );
  if (!match || match.unit_amount == null) {
    throw new Error(
      `No active quarterly price tagged contract_length=${contractLength} found.`,
    );
  }
  return { priceId: match.id, unitAmountCents: match.unit_amount };
}

router.post("/create-subscription", async (req: Request, res: Response) => {
  if (!isStripeConfigured()) {
    res.status(503).json({ error: "Payments are not currently available. Please contact us directly." });
    return;
  }
  const stripeStatus = getStripeInitStatus();
  if (stripeStatus.error) {
    logger.error(
      { stripeInitError: stripeStatus.error },
      "Refusing /create-subscription — Stripe init failed at boot",
    );
    res.status(503).json({
      error:
        "Payments are temporarily unavailable while we restore our billing connection. Please try again in a few minutes or contact billing@sntlabs.io.",
    });
    return;
  }

  const body = (req.body ?? {}) as Record<string, unknown>;
  const submissionId = Number(body["submissionId"]);
  const providedToken = typeof body["submissionToken"] === "string" ? (body["submissionToken"] as string) : "";

  if (!Number.isInteger(submissionId) || submissionId <= 0) {
    res.status(400).json({ error: "submissionId is required" });
    return;
  }
  if (!providedToken) {
    res.status(400).json({ error: "submissionToken is required" });
    return;
  }

  // Supports both the new `confirmation_secret` (Stripe API 2025-09-30+)
  // and the legacy `payment_intent.client_secret`.
  function extractClientSecret(invoice: unknown): string | null {
    if (!invoice || typeof invoice !== "object") return null;
    const inv = invoice as {
      confirmation_secret?: { client_secret?: string | null } | null;
      payment_intent?: string | { client_secret?: string | null } | null;
    };
    if (inv.confirmation_secret?.client_secret) {
      return inv.confirmation_secret.client_secret;
    }
    if (inv.payment_intent && typeof inv.payment_intent !== "string") {
      return inv.payment_intent.client_secret ?? null;
    }
    return null;
  }

  class NotFoundError extends Error {}

  type CreateResult = {
    clientSecret: string;
    subscriptionId: string;
    customerId: string;
    unitAmountCents: number;
    licenseCount: number;
    contractLength: "1yr" | "2yr";
  };

  let result: CreateResult;
  try {
    result = await db.transaction(async (tx) => {
      // FOR UPDATE serializes concurrent callers for the same submission
      // so only one issues the Stripe writes; combined with idempotency
      // keys, no duplicate customers/subscriptions can be created.
      const rows = await tx
        .select()
        .from(intakeSubmissionsTable)
        .where(eq(intakeSubmissionsTable.id, submissionId))
        .for("update")
        .limit(1);
      const submission = rows[0];

      if (!submission || !tokensMatch(submission.submissionToken, providedToken)) {
        throw new NotFoundError();
      }

      const stripe = await getUncachableStripeClient();
      const contractLength = submission.contractLength as "1yr" | "2yr";

      let customerId = submission.stripeCustomerId;
      if (!customerId) {
        const customer = await stripe.customers.create(
          {
            name: submission.firmName,
            email: submission.primaryContactEmail,
            phone: submission.primaryContactPhone,
            address: {
              line1: submission.billingStreet,
              city: submission.billingCity,
              state: submission.billingState,
              postal_code: submission.billingZip,
              country: submission.billingCountry,
            },
            metadata: {
              submission_id: String(submission.id),
              firm_name: submission.firmName,
              contract_length: contractLength,
              license_count: String(submission.licenseCount),
            },
          },
          { idempotencyKey: `intake-${submission.id}-customer` },
        );
        customerId = customer.id;
      }

      const { priceId, unitAmountCents } = await findPriceForContract(contractLength);

      let subscriptionId = submission.stripeSubscriptionId;
      let clientSecret: string | null = null;

      async function resolveClientSecret(
        subId: string,
        latestInvoice: unknown,
      ): Promise<string | null> {
        const inline = extractClientSecret(latestInvoice);
        if (inline) return inline;
        const invoiceId =
          typeof latestInvoice === "string"
            ? latestInvoice
            : (latestInvoice as { id?: string } | null)?.id;
        if (invoiceId) {
          const invoice = await stripe.invoices.retrieve(invoiceId, {
            expand: ["confirmation_secret", "payment_intent"],
          });
          const fromInvoice = extractClientSecret(invoice);
          if (fromInvoice) return fromInvoice;
        }
        const refreshed = await stripe.subscriptions.retrieve(subId, {
          expand: ["latest_invoice.confirmation_secret", "latest_invoice.payment_intent"],
        });
        return extractClientSecret(refreshed.latest_invoice);
      }

      if (subscriptionId) {
        // Existing subscription: never create a second one.
        clientSecret = await resolveClientSecret(subscriptionId, null);
      } else {
        const subscription = await stripe.subscriptions.create(
          {
            customer: customerId,
            items: [{ price: priceId, quantity: submission.licenseCount }],
            payment_behavior: "default_incomplete",
            payment_settings: {
              save_default_payment_method: "on_subscription",
              payment_method_types: ["card"],
            },
            expand: ["latest_invoice.confirmation_secret", "latest_invoice.payment_intent"],
            metadata: {
              submission_id: String(submission.id),
              firm_name: submission.firmName,
              contract_length: contractLength,
              license_count: String(submission.licenseCount),
            },
          },
          { idempotencyKey: `intake-${submission.id}-subscription` },
        );

        subscriptionId = subscription.id;
        clientSecret = await resolveClientSecret(subscriptionId, subscription.latest_invoice);
      }

      if (!clientSecret) {
        const e = new Error("Could not recover payment client_secret for existing subscription");
        (e as Error & { code?: string }).code = "CLIENT_SECRET_UNAVAILABLE";
        throw e;
      }

      await tx
        .update(intakeSubmissionsTable)
        .set({
          stripeCustomerId: customerId,
          stripeSubscriptionId: subscriptionId,
          stripePriceId: priceId,
          updatedAt: sql`NOW()`,
        })
        .where(eq(intakeSubmissionsTable.id, submission.id));

      return {
        clientSecret,
        subscriptionId,
        customerId,
        unitAmountCents,
        licenseCount: submission.licenseCount,
        contractLength,
      };
    });
  } catch (err) {
    if (err instanceof NotFoundError) {
      res.status(404).json({ error: "Submission not found" });
      return;
    }
    const code = (err as { code?: string } | null)?.code;
    if (code === "CLIENT_SECRET_UNAVAILABLE") {
      logger.warn({ submissionId }, "Existing subscription has no recoverable client_secret; client should retry");
      res
        .status(409)
        .json({ error: "Payment session is being prepared. Please try again in a moment." });
      return;
    }
    const message = err instanceof Error ? err.message : "Unknown error";
    logger.error({ err: message, submissionId }, "Failed to create subscription");
    res.status(500).json({ error: "Could not start payment. Please try again." });
    return;
  }

  res.json(result);
});

interface SubmissionStatusResponse {
  status: string;
  invoiceNumber: string | null;
  hostedInvoiceUrl: string | null;
  amountPaidCents: number | null;
  nextBillingAt: string | null;
  emailedAt: string | null;
  teamEmailedAt: string | null;
  clientEmailedAt: string | null;
}

// Polled by the /start success step to detect when the invoice.paid
// webhook has flipped the submission to active and surface invoice
// number / hosted invoice URL / next billing date for the confirmation
// card. Uses the same opaque-token check as /create-subscription so the
// id alone can't enumerate other submissions.
router.get("/submission-status", async (req: Request, res: Response) => {
  const submissionId = Number(req.query["submissionId"]);
  const providedToken =
    typeof req.query["submissionToken"] === "string"
      ? (req.query["submissionToken"] as string)
      : "";

  if (!Number.isInteger(submissionId) || submissionId <= 0) {
    res.status(400).json({ error: "submissionId is required" });
    return;
  }
  if (!providedToken) {
    res.status(400).json({ error: "submissionToken is required" });
    return;
  }

  let submission;
  try {
    const rows = await db
      .select()
      .from(intakeSubmissionsTable)
      .where(eq(intakeSubmissionsTable.id, submissionId))
      .limit(1);
    submission = rows[0];
  } catch (err) {
    logger.error({ err, submissionId }, "Failed to load submission for status poll");
    res.status(500).json({ error: "Could not load submission status." });
    return;
  }

  if (!submission || !tokensMatch(submission.submissionToken, providedToken)) {
    res.status(404).json({ error: "Submission not found" });
    return;
  }

  const response: SubmissionStatusResponse = {
    status: submission.status,
    invoiceNumber: null,
    hostedInvoiceUrl: null,
    amountPaidCents: null,
    nextBillingAt: null,
    emailedAt: submission.emailsSentAt ? submission.emailsSentAt.toISOString() : null,
    teamEmailedAt: submission.teamEmailSentAt ? submission.teamEmailSentAt.toISOString() : null,
    clientEmailedAt: submission.clientEmailSentAt ? submission.clientEmailSentAt.toISOString() : null,
  };

  // Pull invoice number, hosted URL, amount paid, and next billing date
  // from Stripe live so the confirmation card can show them as soon as
  // the webhook fires. Failure here is non-fatal — the polling client
  // will keep showing the graceful fallback.
  if (submission.stripeSubscriptionId && isStripeConfigured()) {
    try {
      const stripe = await getUncachableStripeClient();
      const subscription = await stripe.subscriptions.retrieve(
        submission.stripeSubscriptionId,
        { expand: ["latest_invoice"] },
      );

      const sub = subscription as unknown as {
        current_period_end?: number | null;
        items?: { data?: Array<{ current_period_end?: number | null }> };
        latest_invoice?:
          | string
          | {
              number?: string | null;
              hosted_invoice_url?: string | null;
              amount_paid?: number | null;
              status?: string | null;
            }
          | null;
      };

      const periodEnd =
        sub.current_period_end ?? sub.items?.data?.[0]?.current_period_end ?? null;
      if (typeof periodEnd === "number") {
        response.nextBillingAt = new Date(periodEnd * 1000).toISOString();
      }

      const inv = sub.latest_invoice;
      if (inv && typeof inv !== "string") {
        if (inv.number) response.invoiceNumber = inv.number;
        if (inv.hosted_invoice_url) response.hostedInvoiceUrl = inv.hosted_invoice_url;
        if (typeof inv.amount_paid === "number") response.amountPaidCents = inv.amount_paid;
      }
    } catch (err) {
      logger.warn(
        { err: err instanceof Error ? err.message : err, submissionId },
        "Could not fetch Stripe subscription for status response",
      );
    }
  }

  res.json(response);
});

export default router;

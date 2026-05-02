import { Router, type Request, type Response } from "express";
import { randomBytes, timingSafeEqual } from "node:crypto";
import { eq, sql } from "drizzle-orm";
import { db, intakeSubmissionsTable } from "@workspace/db";
import { getUncachableStripeClient, isStripeConfigured } from "../lib/stripeClient";
import { logger } from "../lib/logger";

function generateSubmissionToken(): string {
  return randomBytes(24).toString("hex");
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
  const billingCountry = s(b["billingCountry"], 80);
  const primaryContactName = s(b["primaryContactName"], 150);
  const primaryContactTitle = s(b["primaryContactTitle"], 150);
  const primaryContactEmail = s(b["primaryContactEmail"], 200);
  const primaryContactPhone = s(b["primaryContactPhone"], 50);

  if (!firmName) return { ok: false, error: "Firm name is required" };
  if (!billingStreet || !billingCity || !billingState || !billingZip || !billingCountry) {
    return { ok: false, error: "Complete billing address is required" };
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

    // The opaque token must be returned exactly once and is the only proof
    // of ownership the client can use to call /create-subscription. We do
    // NOT echo any other DB ids the client doesn't already know.
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

  // Stripe v22 (API 2025-09-30+) replaced `latest_invoice.payment_intent`
  // with `latest_invoice.confirmation_secret`. We try the new field first
  // and fall back to the older `payment_intent.client_secret` so we work
  // across API version pins.
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

  // Distinguish "no such row / bad token" from "real failure" so we can
  // return the correct status without leaking enumeration. Throwing this
  // sentinel inside the transaction triggers a rollback as a side benefit.
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
      // Hold a row-level lock for the entire create-subscription
      // operation. This serializes concurrent callers for the same
      // submission so only one of them issues the Stripe writes; the
      // others see the persisted stripeSubscriptionId after acquiring
      // the lock and reuse it. Combined with Stripe-side idempotency
      // keys, duplicate Stripe customers/subscriptions cannot occur.
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

      if (subscriptionId) {
        const existing = await stripe.subscriptions.retrieve(subscriptionId, {
          expand: ["latest_invoice.confirmation_secret", "latest_invoice.payment_intent"],
        });
        clientSecret = extractClientSecret(existing.latest_invoice);
      }

      if (!subscriptionId || !clientSecret) {
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
        clientSecret = extractClientSecret(subscription.latest_invoice);

        if (!clientSecret && subscription.latest_invoice) {
          const invoiceId =
            typeof subscription.latest_invoice === "string"
              ? subscription.latest_invoice
              : subscription.latest_invoice.id;
          if (invoiceId) {
            const invoice = await stripe.invoices.retrieve(invoiceId, {
              expand: ["confirmation_secret", "payment_intent"],
            });
            clientSecret = extractClientSecret(invoice);
          }
        }
      }

      if (!clientSecret) {
        throw new Error("Stripe did not return a client_secret for the first invoice");
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
    const message = err instanceof Error ? err.message : "Unknown error";
    logger.error({ err: message, submissionId }, "Failed to create subscription");
    res.status(500).json({ error: "Could not start payment. Please try again." });
    return;
  }

  res.json(result);
});

export default router;

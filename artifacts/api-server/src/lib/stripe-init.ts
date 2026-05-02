import { runMigrations } from "stripe-replit-sync";
import { getStripeSync, isStripeConfigured } from "./stripeClient";
import { logger } from "./logger";

let initialized = false;
let initError: string | null = null;
let initSkipped = false;

export interface StripeInitStatus {
  initialized: boolean;
  skipped: boolean;
  error: string | null;
}

export function getStripeInitStatus(): StripeInitStatus {
  return { initialized, skipped: initSkipped, error: initError };
}

/**
 * Initialise the local Stripe sync schema, register a managed webhook, and
 * backfill existing Stripe data. Safe to call repeatedly — the migrations
 * are idempotent and a managed webhook is reused if it already exists.
 *
 * If STRIPE_SECRET_KEY is not configured, this is a no-op so the rest of
 * the API server keeps booting (the /start signup page will show an error
 * until a key is added).
 */
export async function initStripe(): Promise<void> {
  if (initialized) return;

  if (!isStripeConfigured()) {
    initSkipped = true;
    logger.warn(
      "STRIPE_SECRET_KEY not set — Stripe initialization skipped. " +
        "Add it via the Secrets tab to enable the /start signup page.",
    );
    return;
  }

  const databaseUrl = process.env["DATABASE_URL"];
  if (!databaseUrl) {
    throw new Error("DATABASE_URL is required to initialize Stripe");
  }

  try {
    logger.info("Running Stripe schema migrations...");
    await runMigrations({ databaseUrl });

    const stripeSync = await getStripeSync();

    const replitDomain = process.env["REPLIT_DOMAINS"]?.split(",")[0];
    if (replitDomain) {
      const webhookUrl = `https://${replitDomain}/api/stripe/webhook`;
      logger.info({ webhookUrl }, "Setting up managed Stripe webhook...");
      try {
        const webhook = await stripeSync.findOrCreateManagedWebhook(webhookUrl);
        logger.info({ webhookId: webhook.id, url: webhook.url }, "Managed webhook ready");
      } catch (err) {
        logger.error({ err }, "Failed to set up managed webhook");
      }
    } else {
      logger.warn("REPLIT_DOMAINS not set — skipping managed webhook setup");
    }

    logger.info("Backfilling Stripe data in background...");
    stripeSync
      .syncBackfill()
      .then(() => logger.info("Stripe backfill complete"))
      .catch((err) => logger.error({ err }, "Stripe backfill failed"));

    initialized = true;
    initError = null;
  } catch (err) {
    initError = err instanceof Error ? err.message : String(err);
    logger.error(
      { err },
      "Failed to initialise Stripe — continuing without it. /api/healthz will report degraded.",
    );
  }
}

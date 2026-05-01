import Stripe from "stripe";
import { StripeSync } from "stripe-replit-sync";

/**
 * Stripe is configured via Replit Secrets (no Stripe Replit integration is
 * available in this org), so we read the secret key from the environment.
 *
 * Webhook signing secret: the optional `STRIPE_WEBHOOK_SECRET` env var is
 * supported as a manual fallback. If not set, `stripe-replit-sync` uses its
 * own managed webhook (created via `findOrCreateManagedWebhook`) and tracks
 * the signing secret internally in the `stripe.managed_webhooks` table.
 */

export function isStripeConfigured(): boolean {
  return Boolean(process.env["STRIPE_SECRET_KEY"]);
}

export async function getUncachableStripeClient(): Promise<Stripe> {
  const secretKey = process.env["STRIPE_SECRET_KEY"];
  if (!secretKey) {
    throw new Error(
      "STRIPE_SECRET_KEY is not set. Configure it in the Replit Secrets tab.",
    );
  }
  return new Stripe(secretKey);
}

export async function getStripeSync(): Promise<StripeSync> {
  const databaseUrl = process.env["DATABASE_URL"];
  if (!databaseUrl) {
    throw new Error("DATABASE_URL environment variable is required");
  }

  const secretKey = process.env["STRIPE_SECRET_KEY"];
  if (!secretKey) {
    throw new Error("STRIPE_SECRET_KEY is not set");
  }

  return new StripeSync({
    poolConfig: { connectionString: databaseUrl },
    stripeSecretKey: secretKey,
    stripeWebhookSecret: process.env["STRIPE_WEBHOOK_SECRET"] ?? "",
  });
}

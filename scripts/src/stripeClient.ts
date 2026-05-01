import Stripe from "stripe";

/**
 * Returns a fresh authenticated Stripe client.
 * Reads STRIPE_SECRET_KEY from the environment. Stripe is configured via
 * Replit secrets (no Replit Stripe connector is available in this org).
 */
export async function getUncachableStripeClient(): Promise<Stripe> {
  const secretKey = process.env["STRIPE_SECRET_KEY"];
  if (!secretKey) {
    throw new Error(
      "STRIPE_SECRET_KEY environment variable is required. " +
        "Add it via the Secrets tab in the Replit workspace.",
    );
  }
  return new Stripe(secretKey);
}

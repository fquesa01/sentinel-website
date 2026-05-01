import { getUncachableStripeClient } from "./stripeClient";

/**
 * Seed Stripe with the Sentinel Counsel per-seat license product and
 * the two recurring per-unit prices used by the /start signup page.
 *
 * Annual rate: $2,500 / license / year.
 *   - 1-year contract: $625.00 / license, billed every 3 months.
 *   - 2-year contract: $562.50 / license, billed every 3 months (10% discount).
 *
 * Both prices are quarterly (interval=month, interval_count=3) so Stripe
 * actually charges every 3 months while we keep our marketing language
 * ("$2,500 / license / year").
 *
 * Idempotent: re-running this script will only create resources that don't
 * already exist (looked up by name / metadata).
 *
 * Run with: pnpm --filter @workspace/scripts run seed-products
 */

const PRODUCT_NAME = "Sentinel Counsel — Per-Seat License";

async function findOrCreateProduct(stripe: Awaited<ReturnType<typeof getUncachableStripeClient>>) {
  const existing = await stripe.products.search({
    query: `name:'${PRODUCT_NAME}' AND active:'true'`,
  });

  if (existing.data.length > 0) {
    const product = existing.data[0]!;
    console.log(`Product already exists: ${product.id}`);
    return product;
  }

  const product = await stripe.products.create({
    name: PRODUCT_NAME,
    description:
      "Per-seat license for Sentinel Counsel litigation platform. " +
      "Annual list price $2,500 / seat, billed quarterly.",
    metadata: {
      sku: "sentinel_counsel_seat",
    },
  });
  console.log(`Created product: ${product.id}`);
  return product;
}

async function findOrCreatePrice(
  stripe: Awaited<ReturnType<typeof getUncachableStripeClient>>,
  productId: string,
  unitAmount: number,
  contractLength: "1yr" | "2yr",
  nickname: string,
) {
  const existing = await stripe.prices.list({
    product: productId,
    active: true,
    limit: 100,
  });

  const match = existing.data.find(
    (p) =>
      p.unit_amount === unitAmount &&
      p.currency === "usd" &&
      p.recurring?.interval === "month" &&
      p.recurring?.interval_count === 3 &&
      p.metadata?.["contract_length"] === contractLength,
  );

  if (match) {
    console.log(`Price already exists for ${contractLength}: ${match.id}`);
    return match;
  }

  const price = await stripe.prices.create({
    product: productId,
    unit_amount: unitAmount,
    currency: "usd",
    nickname,
    recurring: {
      interval: "month",
      interval_count: 3,
    },
    metadata: {
      contract_length: contractLength,
    },
  });
  console.log(`Created price (${contractLength}): ${price.id} ($${(unitAmount / 100).toFixed(2)} / qtr)`);
  return price;
}

async function main() {
  const stripe = await getUncachableStripeClient();
  console.log("Seeding Sentinel Counsel Stripe catalog...\n");

  const product = await findOrCreateProduct(stripe);

  const oneYearPrice = await findOrCreatePrice(
    stripe,
    product.id,
    62500, // $625.00 / seat / quarter ($2,500 / yr)
    "1yr",
    "Sentinel Counsel — 1-year quarterly",
  );

  const twoYearPrice = await findOrCreatePrice(
    stripe,
    product.id,
    56250, // $562.50 / seat / quarter ($2,250 / yr — 10% off)
    "2yr",
    "Sentinel Counsel — 2-year quarterly (10% off)",
  );

  console.log("\nDone.");
  console.log(`  Product: ${product.id}`);
  console.log(`  1yr price: ${oneYearPrice.id}`);
  console.log(`  2yr price: ${twoYearPrice.id}`);
  console.log("\nWebhooks will sync these to the local Postgres stripe schema automatically.");
}

main().catch((err) => {
  console.error("Failed to seed Stripe products:", err);
  process.exit(1);
});

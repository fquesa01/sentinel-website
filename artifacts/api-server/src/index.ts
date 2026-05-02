import app from "./app";
import { logger } from "./lib/logger";
import { initStripe } from "./lib/stripe-init";
import { runDbMigrations } from "@workspace/db";

const rawPort = process.env["PORT"];

if (!rawPort) {
  throw new Error(
    "PORT environment variable is required but was not provided.",
  );
}

const port = Number(rawPort);

if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

// Apply any pending Drizzle migrations before opening the listener so the
// schema is guaranteed to match what the routes expect. Drizzle skips
// already-applied migrations via its tracking table.
logger.info("Running app DB migrations...");
await runDbMigrations();
logger.info("App DB migrations complete");

await initStripe();

app.listen(port, (err) => {
  if (err) {
    logger.error({ err }, "Error listening on port");
    process.exit(1);
  }

  logger.info({ port }, "Server listening");
});

import { Router, type IRouter } from "express";
import { HealthCheckResponse } from "@workspace/api-zod";
import { getStripeInitStatus } from "../lib/stripe-init";

const router: IRouter = Router();

router.get("/healthz", (_req, res) => {
  const data = HealthCheckResponse.parse({ status: "ok" });
  res.json(data);
});

router.get("/health", (_req, res) => {
  const stripe = getStripeInitStatus();
  const stripeOk = stripe.initialized || stripe.skipped;
  const status = stripe.error ? "degraded" : "ok";
  res.status(stripeOk ? 200 : 503).json({
    status,
    stripe: {
      initialized: stripe.initialized,
      configured: !stripe.skipped,
      error: stripe.error,
    },
  });
});

export default router;

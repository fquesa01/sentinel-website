import { Router, type Request, type Response } from "express";

const router = Router();

/**
 * Returns the Stripe publishable key for the frontend Payment Element.
 * Public on purpose — Stripe publishable keys are intended to be exposed.
 */
router.get("/stripe-config", (_req: Request, res: Response) => {
  const publishableKey = process.env["STRIPE_PUBLISHABLE_KEY"] ?? null;
  res.json({ publishableKey });
});

export default router;

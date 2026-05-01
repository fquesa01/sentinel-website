import { Router, type IRouter } from "express";
import healthRouter from "./health";
import demoRequestRouter from "./demo-request";
import intakeRouter from "./intake";
import stripeConfigRouter from "./stripe-config";

const router: IRouter = Router();

router.use(healthRouter);
router.use(demoRequestRouter);
router.use(intakeRouter);
router.use(stripeConfigRouter);

export default router;

import { Router, type IRouter } from "express";
import healthRouter from "./health";
import demoRequestRouter from "./demo-request";

const router: IRouter = Router();

router.use(healthRouter);
router.use(demoRequestRouter);

export default router;

import { Router } from "express";
import { isAuth } from "../middleware";
import { createConsumption, getTotalConsumed } from "../controllers";

const router = Router();

// POST /api/consumptions
router.post("/consumptions", isAuth, createConsumption);

// GET /api/totalConsumed
router.get("/totalConsumed", isAuth, getTotalConsumed);

export { router as consumption };

import { Router } from "express";
import { isAuth } from "../middleware";
import { createConsumption } from "../controllers";

const router = Router();

// POST /api/consumptions
router.post("/consumptions", isAuth, createConsumption);

export { router as consumption };

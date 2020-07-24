import { Router } from "express";
import { body } from "express-validator";
import { isAuth } from "../middleware";
import {
  getBeers,
  createBeer,
  getBeer,
  updateBeer,
  deleteBeer,
} from "../controllers";

const router = Router();

// GET /api/beers
router.get("/beers", isAuth, getBeers);

// POST /api/beers
router.post(
  "/beers",
  isAuth,
  [body("type").not().isEmpty().trim(), body("brand").not().isEmpty().trim()],
  createBeer
);

// GET /api/beers/:beerId
router.get("/beers/:beerId", isAuth, getBeer);

// PUT /api/beers/:beerId
router.put(
  "/beers/:beerId",
  isAuth,
  [body("type").not().isEmpty().trim(), body("brand").not().isEmpty().trim()],
  updateBeer
);

// DELETE /api/beers/:beerId
router.delete("/beers/:beerId", isAuth, deleteBeer);

export { router as beer };

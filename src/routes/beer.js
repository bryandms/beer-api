import { Router } from "express";
import { body } from "express-validator";
import {
  getBeers,
  createBeer,
  getBeer,
  updateBeer,
  deleteBeer,
} from "../controllers";

const router = Router();

// GET /api/beers
router.get("/beers", getBeers);

// POST /api/beers
router.post(
  "/beers",
  [body("type").not().isEmpty().trim(), body("brand").not().isEmpty().trim()],
  createBeer
);

// GET /api/beers/:beerId
router.get("/beers/:beerId", getBeer);

// PUT /api/beers/:beerId
router.put(
  "/beers/:beerId",
  [body("type").not().isEmpty().trim(), body("brand").not().isEmpty().trim()],
  updateBeer
);

// DELETE /api/beers/:beerId
router.delete("/beers/:beerId", deleteBeer);

export { router as beer };

import { Router } from "express";
import { body } from "express-validator";
import { isAuth } from "../middleware";
import { getBeers, createBeer, getBeer, updateBeer } from "../controllers";

const router = Router();

// GET /api/beers
router.get("/beers", isAuth, getBeers);

// POST /api/beers
router.post(
  "/beers",
  isAuth,
  [
    body("type").not().isEmpty().trim().withMessage("The type is required."),
    body("brand").not().isEmpty().trim().withMessage("The brand is required."),
    body("alcoholPercentage")
      .isInt({ gt: -1, lt: 101 })
      .withMessage(
        "The alcohol percentage must be greater than or equal to 0 and less than or equal to 100."
      ),
  ],
  createBeer
);

// GET /api/beers/:beerId
router.get("/beers/:beerId", isAuth, getBeer);

// PUT /api/beers/:beerId
router.put(
  "/beers/:beerId",
  isAuth,
  [
    body("type").not().isEmpty().trim().withMessage("The type is required."),
    body("brand").not().isEmpty().trim().withMessage("The brand is required."),
    body("alcoholPercentage")
      .isInt({ gt: 0, lt: 100 })
      .withMessage(
        "The alcohol percentage must be greater than or equal to 0 and less than or equal to 100."
      ),
  ],
  updateBeer
);

export { router as beer };

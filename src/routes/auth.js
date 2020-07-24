import { Router } from "express";
import { body } from "express-validator";
import { signup, login } from "../controllers";
import { User } from "../models";

const router = Router();

// POST /api/auth/signup
router.post(
  "/signup",
  [
    body("email")
      .isEmail()
      .withMessage("Please enter a valid email.")
      .custom((email) =>
        User.findOne({ email }).then((user) => {
          if (user) return Promise.reject("Email address already exists.");
        })
      )
      .normalizeEmail(),
    body("password").trim().isLength({ min: 6 }),
    body("name").trim().not().isEmpty(),
  ],
  signup
);

// POST /api/auth/login
router.post("/login", login);

export { router as auth };

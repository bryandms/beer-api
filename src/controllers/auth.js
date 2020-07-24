import { APP_SECRET_KEY } from "../config";
import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models";

export const signup = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error("Could not create user.");
    error.statusCode = 422;
    error.data = errors.array();

    throw error;
  }

  const { email, password, name } = req.body;

  bcrypt
    .hash(password, 12)
    .then((hashedPassword) => {
      const user = new User({
        email,
        password: hashedPassword,
        name,
      });

      return user.save();
    })
    .then((result) => {
      res
        .status(201)
        .json({ message: "User created successfully.", userId: result._id });
    })
    .catch((err) => {
      if (!err.statusCode) err.statusCode = 500;

      next(err);
    });
};

export const login = (req, res, next) => {
  const { email, password } = req.body;
  let loadedUser;

  User.findOne({ email })
    .then((user) => {
      if (!user) {
        const error = new Error("These credentials do not match our records.");
        error.statusCode = 401;

        throw error;
      }

      loadedUser = user;

      return bcrypt.compare(password, user.password);
    })
    .then((isEqual) => {
      if (!isEqual) {
        const error = new Error("These credentials do not match our records.");
        error.statusCode = 401;

        throw error;
      }

      const token = jwt.sign(
        {
          email: loadedUser.email,
          userId: loadedUser._id.toString(),
        },
        APP_SECRET_KEY,
        { expiresIn: "1h" }
      );

      res.status(200).json({ token, userId: loadedUser._id.toString() });
    })
    .catch((err) => {
      if (!err.statusCode) err.statusCode = 500;

      next(err);
    });
};

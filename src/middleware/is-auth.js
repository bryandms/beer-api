import jwt from "jsonwebtoken";
import { APP_SECRET_KEY } from "../config";

export const isAuth = (req, res, next) => {
  const authHeader = req.get("Authorization");

  if (!authHeader) {
    const error = new Error("Not authenticated.");
    error.statusCode = 401;

    throw error;
  }

  const token = authHeader.split(" ")[1];
  let decodedToken;

  try {
    decodedToken = jwt.verify(token, APP_SECRET_KEY);
  } catch (err) {
    err.statusCode = 500;

    throw err;
  }

  if (!decodedToken) {
    const error = new Error("Not authenticated.");
    error.statusCode = 401;

    throw error;
  }

  req.userId = decodedToken.userId;

  next();
};

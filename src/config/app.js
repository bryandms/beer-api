if (process.env.NODE_ENV !== "production") require("dotenv").config();

export const {
  NODE_ENV = "development",
  PORT = 3000,
  APP_SECRET_KEY = "YOUR_APP_SECRET_KEY",
} = process.env;

export const IN_PROD = NODE_ENV === "production";

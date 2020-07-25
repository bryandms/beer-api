import express from "express";
import { auth, beer, consumption } from "./routes";

export const createApp = () => {
  const app = express();

  app.use(express.json());

  app.use("/api/auth", auth);

  app.use("/api", beer);

  app.use("/api", consumption);

  app.use((error, req, res, next) => {
    console.log(error);

    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;

    res.status(status).json({ message: message, data: data });
  });

  return app;
};

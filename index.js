if (process.env.NODE_ENV !== "production") require("dotenv").config();

import express from "express";

const PORT = process.env.PORT || 8080;
const app = express();

app.get("/", (req, res) => {
  res.send("Beer API");
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});

import mongoose from "mongoose";
import { DB_URI, DB_OPTIONS, PORT } from "./src/config";
import { createApp } from "./src/app";

const app = createApp();

mongoose
  .connect(DB_URI, DB_OPTIONS)
  .then(() =>
    app.listen(PORT, () => console.log(`Server listening on port ${PORT}`))
  )
  .catch((err) => console.log(err));

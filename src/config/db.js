if (process.env.NODE_ENV !== "production") require("dotenv").config();

const { MONGO_DB_URI = "" } = process.env;

export const DB_URI = MONGO_DB_URI;

export const DB_OPTIONS = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true,
};

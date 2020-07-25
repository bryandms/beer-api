import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    consumptions: [
      {
        type: Schema.Types.ObjectId,
        ref: "Consumption",
      },
    ],
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);

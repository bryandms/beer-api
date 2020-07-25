import mongoose from "mongoose";
const Schema = mongoose.Schema;

const consumptionSchema = new Schema(
  {
    quantity: {
      type: Number,
      default: 1,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    beer: {
      type: Schema.Types.ObjectId,
      ref: "Beer",
      required: true,
    },
  },
  { timestamps: true }
);

export const Consumption = mongoose.model("Consumption", consumptionSchema);

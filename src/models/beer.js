import mongoose from "mongoose";
const Schema = mongoose.Schema;

const beerSchema = new Schema(
  {
    type: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    alcoholPercentage: {
      type: Number,
      default: 0,
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

export const Beer = mongoose.model("Beer", beerSchema);

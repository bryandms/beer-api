import { Beer, Consumption, User } from "../models";

export const createConsumption = (req, res, next) => {
  const { beerId, quantity } = req.body;

  Beer.findById(beerId)
    .then(async (beer) => {
      if (!beer) {
        const error = new Error("Could not find beer.");
        error.statusCode = 404;

        throw error;
      }

      let user = await User.findById(req.userId);

      let consumption = new Consumption({
        quantity,
        user: req.userId,
        beer: beer.id,
      });

      consumption = await consumption.save();

      await Beer.findOneAndUpdate(
        { _id: beer._id },
        { $push: { consumptions: consumption._id } },
        { new: true }
      );
      await User.findOneAndUpdate(
        { _id: req.userId },
        { $push: { consumptions: consumption._id } },
        { new: true }
      );

      return consumption;
    })
    .then((result) => {
      res.status(200).json({
        message: "Consumption created successfully.",
        consumption: result,
      });
    })
    .catch((err) => {
      if (!err.statusCode) err.statusCode = 500;

      next(err);
    });
};

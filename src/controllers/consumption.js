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

export const getTotalConsumed = (req, res, next) => {
  User.findById(req.userId)
    .populate("consumptions")
    .then((user) => {
      if (!user) {
        const error = new Error("Could not find user.");
        error.statusCode = 404;

        throw error;
      }

      const getTotalConsumed = (total, consumption) => {
        return (
          total + (consumption.user == req.userId ? consumption.quantity : 0)
        );
      };

      let totalConsumed = user.consumptions.reduce(getTotalConsumed, 0);

      res
        .status(200)
        .json({ message: "Total consumed fetched.", totalConsumed });
    })
    .catch((err) => {
      if (!err.statusCode) err.statusCode = 500;

      next(err);
    });
};

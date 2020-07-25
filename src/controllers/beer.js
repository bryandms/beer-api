import { validationResult } from "express-validator";
import { Beer } from "../models";

export const getBeers = (req, res, next) => {
  const currentPage = req.query.page || 1;
  const perPage = 10;
  let totalItems;

  Beer.find()
    .countDocuments()
    .then((count) => {
      totalItems = count;

      return Beer.find()
        .skip((currentPage - 1) * perPage)
        .limit(perPage);
    })
    .then((beers) => {
      res.status(200).json({
        message: "Beers fetched successfully.",
        beers,
        totalItems,
      });
    })
    .catch((err) => {
      if (!err.statusCode) err.statusCode = 500;

      next(err);
    });
};

export const createBeer = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error("Could not create beer.");
    error.statusCode = 422;

    throw error;
  }

  const { type, brand, alcoholPercentage } = req.body;
  const beer = new Beer({
    type,
    brand,
    alcoholPercentage,
  });

  beer
    .save()
    .then(() => {
      res.status(201).json({
        message: "Beer created successfully.",
        beer,
      });
    })
    .catch((err) => {
      if (!err.statusCode) err.statusCode = 500;

      next(err);
    });
};

export const getBeer = (req, res, next) => {
  const beerId = req.params.beerId;

  Beer.findById(beerId)
    .populate("consumptions")
    .then((beer) => {
      if (!beer) {
        const error = new Error("Could not find beer.");
        error.statusCode = 404;

        throw error;
      }

      const getTotalConsumed = (total, consumption) => {
        return (
          total + (consumption.user == req.userId ? consumption.quantity : 0)
        );
      };

      let newBeer = beer._doc;
      newBeer.totalConsumed = beer.consumptions.reduce(getTotalConsumed, 0);
      delete newBeer.consumptions;

      res.status(200).json({ message: "Beer fetched.", beer: newBeer });
    })
    .catch((err) => {
      if (!err.statusCode) err.statusCode = 500;

      next(err);
    });
};

export const updateBeer = (req, res, next) => {
  const beerId = req.params.beerId;
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const error = new Error("Could not update beer.");
    error.statusCode = 422;

    throw error;
  }

  const { type, brand, alcoholPercentage } = req.body;

  Beer.findById(beerId)
    .then((beer) => {
      if (!beer) {
        const error = new Error("Could not find beer.");
        error.statusCode = 404;

        throw error;
      }

      beer.type = type;
      beer.brand = brand;
      beer.alcoholPercentage = alcoholPercentage;

      return beer.save();
    })
    .then((result) => {
      res
        .status(200)
        .json({ message: "Beer updated successfully.", beer: result });
    })
    .catch((err) => {
      if (!err.statusCode) err.statusCode = 500;

      next(err);
    });
};

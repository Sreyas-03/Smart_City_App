/*
 * Sign a user up with local password strategy
 * POST: {email, password, name}
 */

const User = require("../../models/user"),
  normaliseValidationErrors = require("../../helpers/normaliseValidationErrors"),
  { validationResult } = require("express-validator");

module.exports = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(normaliseValidationErrors(errors));
  }

  User.createUser(req.body)
    .then((user) => {
      res.json({ _id: user._id });
    })
    .catch((error) => next(error));
};

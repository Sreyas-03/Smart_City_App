const { body } = require("express-validator"),
  passwordValidationHelper = require("./helpers/password"),
  User = require("../../models/user");

module.exports = [
  body("email", "Invalid email").isEmail(),
  body("email").custom((email) => {
    return new Promise((resolve, reject) => {
      User.findOne({ email }).then((user) => {
        if (user) return reject("Email is already in use");
        resolve();
      }).catch((error) => reject(error));
    });
  }),
  ...passwordValidationHelper("password"),
  body("name", "Missing name").isLength({ min: 1 })
];

const { body } = require("express-validator");

module.exports = (passwordField) => [
  body(passwordField, "Invalid password").isLength({ min: 8 })
];

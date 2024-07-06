const passwordValidationHelper = require("./helpers/password");

module.exports = [
  ...passwordValidationHelper("newPassword")
];

const { body } = require("express-validator"),
  User = require("../../models/user");

module.exports = [
  body("email", "Invalid email").isEmail(),
  body("email").custom((email) => {
    return new Promise((resolve, reject) => {
      User.findOne({ email }).then((user) => {
        if (!user) return reject("Couldn't find a user with this email address");
        if (!user.password) return reject("Please use Google login");

        resolve();
      }).catch((error) => reject(error));
    });
  })
];

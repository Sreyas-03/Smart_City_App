const mongoose = require("../helpers/db"),
  crypto = require("crypto");

const schema = mongoose.Schema({
  name: String,
  email: String,
  dateRegistered: Date,
  picture: String,
  salt: String,
  password: Buffer,
  admin: {type: Boolean, default: false},
});

schema.methods.setPassword = function (password) {
  return new Promise((resolve, reject) => {
    crypto.pbkdf2(
      password,
      this.salt,
      310000,
      32,
      "sha256",
      (err, hashedPassword) => {
        if (err) return reject(err);

        this.password = hashedPassword;
        resolve();
      }
    );
  }).then(() => this.save());
};

schema.statics.createUser = function ({
  googleId,
  name,
  picture,
  email,
  password
}) {
  /*
   * Create and save a user in the database with the supplied parameters.
   * Note that no validations are performed, do that beforehand.
   */

  const userObj = new this();

  userObj.name = name;
  userObj.picture = picture;
  userObj.email = email;
  userObj.dateRegistered = Date.now();

  if (googleId) {
    userObj.googleId = googleId;
    return userObj.save();
  }

  userObj.salt = crypto.randomBytes(32).toString("base64");
  return userObj.setPassword(password);
};

schema.statics.findLocalUser = function (email, password) {
  /*
   * Resolves by providing an {error, user} object.
   * The user property is the user with the given email and password.
   * If no such user exists, then the user property is undefined.
   */

  return new Promise((resolve) => {
    this.findOne({ email })
      .then((user) => {
        if (!user || !user.salt)
          return resolve({ error: { message: "Couldn't find user" } });

        crypto.pbkdf2(
          password,
          user.salt,
          310000,
          32,
          "sha256",
          (error, hashedInputPassword) => {
            if (error) return resolve({ error });

            if (!crypto.timingSafeEqual(hashedInputPassword, user.password))
              resolve({});

            resolve({ user });
          }
        );
      })
      .catch((error) => resolve({ error }));
  });
};

module.exports = mongoose.model("User", schema, "users");

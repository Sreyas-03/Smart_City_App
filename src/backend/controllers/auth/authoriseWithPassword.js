// Checks posted username and password for local authentication
// POST: {username, password}
// Note the username property, it's NOT named email. Too lazy to change defaults.

const passport = require("passport");

module.exports = (req, res, next) => {
  return [
    passport.authenticate("local", (err, user, info) => {
      if (err) return next(err);
      if (!user)
        return res
          .status(401)
          .json({ success: false, message: "Incorrect credentials" });

      req.login(user, (err) => {
        if (err) return next(err);
        return res.json({ success: true });
      });
    })(req, res, next),
    (req, res) => res.redirect(process.env.AUTH_SUCCESS_REDIRECT)
  ];
};

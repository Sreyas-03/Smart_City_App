const LocalStrategy = require("passport-local"),
  User = require("../../models/user");

module.exports = (passport) => {
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id).exec().then((user) => {
      done(null, user);
    }).catch((error) => done(error));
  });

  passport.use(new LocalStrategy(
    (username, password, cb) => {
      User.findLocalUser(username, password).then(({ error, user }) => {
        return cb(error || null, user);
      });
    }
  ));
};

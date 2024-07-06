// Responds with user's info

module.exports = (req, res, next) => {
  const user = req.user;
  user.password = undefined;
  user.salt = undefined;
  res.json(user);
};

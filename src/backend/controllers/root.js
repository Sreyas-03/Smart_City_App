// Handles example.com/

module.exports = (req, res, next) => {
  res.send(
    req.user
      ? `Oh wow, you're authenticated ${req.user.name}`
      : "You're not yet logged in : ("
  );
};

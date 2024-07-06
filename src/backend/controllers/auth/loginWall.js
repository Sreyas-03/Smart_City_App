// Send HTTP Code of unauthenticated if the user isn't logged in, otherwise continue

module.exports = (req, res, next) => {
  // If the user is authenticated in the session, carry on
  if (req.isAuthenticated()) return next();

  // If the user isn't logged in, send error code
  res.status(401).json({ error: "unauthorized" });
};

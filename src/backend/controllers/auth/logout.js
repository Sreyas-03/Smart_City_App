// Log out the user

module.exports = (req, res, next) => {
  req.logout();
  res.json({ success: true });
};

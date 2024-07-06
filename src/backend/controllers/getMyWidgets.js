const Widget = require("../models/widget"),
  processWidgets = require("../helpers/processWidgets");

module.exports = (req, res, next) => {
  const { user } = req;

  Widget.find({ user: user._id })
    .then(processWidgets)
    .then((widgets) => res.json(widgets))
    .catch((err) => next(err));
};

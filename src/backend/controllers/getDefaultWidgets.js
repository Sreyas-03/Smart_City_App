const Widget = require("../models/widget"),
  processWidgets = require("../helpers/processWidgets");

module.exports = (req, res, next) => {
  Widget.find({ user: null })
    .then(processWidgets)
    .then((widgets) => res.json(widgets))
    .catch((err) => next(err));
};

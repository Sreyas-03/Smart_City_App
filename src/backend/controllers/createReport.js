/* POST: {text} */

const Report = require("../models/report");

module.exports = (req, res, next) => {
  const { text } = req.body;

  Report.createReport({ text, user: req.user._id })
    .then(() => res.json({ success: true }))
    .catch((err) => next(err));
};

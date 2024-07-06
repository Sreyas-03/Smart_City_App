const Report = require("../models/report");

module.exports = (req, res, next) => {
  Report.find()
    .then((reports) => {
      res.json({ reports });
    })
    .catch((err) => next(err));
};

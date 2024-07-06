const BlockedSensorType = require("../models/blockedSensorType");

module.exports = (req, res, next) => {
  BlockedSensorType.find({})
    .then((blockedSensorTypes) => {
      res.json({ blockedSensorTypes });
    })
    .catch((err) => next(err));
};

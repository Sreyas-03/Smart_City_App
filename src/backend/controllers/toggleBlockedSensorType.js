/* POST: {type} */

const BlockedSensorType = require("../models/blockedSensorType");

module.exports = (req, res, next) => {
  let { type } = req.body;
  type = type.toLowerCase();

  // if already blocked then unblock
  BlockedSensorType.findOne({ type }).then((blockedSensorTypes) => {
    if (blockedSensorTypes) {
      BlockedSensorType.deleteOne({ type })
        .then(() => res.json({ success: true }))
        .catch((err) => next(err));
    } else {
      // if not blocked then block
      BlockedSensorType.create({ type })
        .then(() => res.json({ success: true }))
        .catch((err) => next(err));
    }
  });
};

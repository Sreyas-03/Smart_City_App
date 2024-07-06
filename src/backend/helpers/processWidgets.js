/* Insert threshold values into each sensor object, and filter out blocked types */

const Threshold = require("../models/threshold"),
  BlockedSensorType = require("../models/blockedSensorType");

module.exports = (widgets) => {
  return BlockedSensorType.find().then((blockedSensorTypes) => {
    const promises = widgets.map((widget) =>
      blockedSensorTypes.some(
        (blockedSensorType) => blockedSensorType.type === widget.type.toLowerCase()
      )
        ? Promise.resolve(null)
        : Threshold.findOne({ type: widget.type }).then((threshold) => {
            return { ...widget._doc, threshold };
          })
    );

    return Promise.all(promises).then((widgets) =>
      widgets.filter((widget) => widget !== null)
    );
  });
};

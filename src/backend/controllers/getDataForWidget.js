/*
 * GET: {type, location}
 */
const Node = require("../models/node"),
  BlockedSensorType = require("../models/blockedSensorType"),
  Threshold = require("../models/threshold"),
  getNodeLocationFromName = require("../helpers/getNodeLocationFromName");

// const readingCount = 30;

module.exports = (req, res, next) => {
  const { type, location } = req.query;

  BlockedSensorType.find().then((blockedSensorTypes) => {
    if (
      blockedSensorTypes.some(
        (blockedSensorType) => blockedSensorType.type === type.toLowerCase()
      )
    )
      return res.send({ error: "Unauthorised" });

    // find all nodes with given type
    Node.find().then((nodes) => {
      // make readings an array with readingCount 0s
      let history = [],
        lastSum = 0,
        nodeCount = 0;

      Threshold.findOne({ type })
        .then(({ minValue, maxValue }) => {
          // First find nodes in the given location
          nodes.forEach((node) => {
            if (getNodeLocationFromName(node.name) !== location) return;

            node.data.forEach(({ name, values }) => {
              // check if this field in the node is the type we want
              if (name === type) {
                values = values.map((entry) => {
                  const time = Object.keys(entry)[0];
                  entry[time] = Math.max(
                    minValue,
                    Math.min(maxValue, entry[time])
                  );

                  return entry;
                });

                history = [...history, ...values];
                lastSum += Object.values(values[0])[0];
                nodeCount++;
              }
            });
          });

          // send readings
          res.send({ lastMean: lastSum / nodeCount, history });
        })
        .catch(next);
    });
  });
};

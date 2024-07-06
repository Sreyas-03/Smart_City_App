const Node = require("../models/node"),
  BlockedSensorType = require("../models/blockedSensorType");

module.exports = (req, res, next) => {
  BlockedSensorType.find().then((blockedSensorTypes) => {
    Node.find()
      .select({ name: 1, coords: 1, _id: 0, "data.name": 1 })
      .then((nodes) => {
        nodes = nodes.map((node) => {
          node.data = node.data.filter(
            (sensor) =>
              !blockedSensorTypes.some(
                (blockedSensorType) => blockedSensorType.type === sensor.name.toLowerCase()
              )
          );

          return node;
        });

        res.json({ nodes });
      })
      .catch((err) => next(err));
  });
};

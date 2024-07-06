const Node = require("../models/node"),
  BlockedSensorType = require("../models/blockedSensorType");

module.exports = (req, res, next) => {
  BlockedSensorType.find().then((blockedSensorTypes) => {
    Node.find()
      .select({ name: 1, coords: 1, _id: 0, data: 1 })
      .then((nodes) => {
        nodes = nodes.map((node) => {
          let current = {
            latitude: node.coords[0],
            longitude: node.coords[1],
            name: node.name
          };

          node.data = node.data.filter(
            (sensor) =>
              !blockedSensorTypes.some(
                (blockedSensorType) =>
                  blockedSensorType.type === sensor.name.toLowerCase()
              )
          );

          node.data.forEach((sensor) => {
            current[sensor.name] = sensor.values[0];
          });

          return current;
        });

        res.json({ nodes });
      })
      .catch((err) => next(err));
  });
};

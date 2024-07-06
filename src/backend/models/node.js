const mongoose = require("../helpers/db");

const schema = mongoose.Schema({
  name: { type: String, required: true },
  coords: { type: [Number], required: true },
  data: { type: [{ name: String, values: Array }], default: [] }
});

schema.statics.createNode = function ({ name, coords }) {
  const obj = new this();

  obj.name = name;
  obj.coords = coords;

  return obj.save();
};

module.exports = mongoose.model("Node", schema, "nodes");

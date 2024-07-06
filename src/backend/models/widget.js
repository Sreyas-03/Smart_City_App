const mongoose = require("../helpers/db");

const schema = mongoose.Schema({
  user: mongoose.Schema.Types.ObjectId,
  type: { type: String, required: true },
  location: { type: String, required: true },
  visualisation: { type: String, default: "line" }
});

schema.statics.createWidget = function ({ user, type, location, visualisation }) {
  /*
   * Create and save a widget in the database with the supplied parameters.
   * Note that no validations are performed, do that beforehand.
   */

  const obj = new this();

  obj.user = user;
  obj.type = type;
  obj.location = location;
  obj.visualisation = visualisation;

  return obj.save();
};

module.exports = mongoose.model("Widget", schema, "widgets");

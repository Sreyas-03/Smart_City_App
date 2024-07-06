const mongoose = require("../helpers/db");

const schema = mongoose.Schema({
  text: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  resolved: {type: Boolean, default: false},
});

schema.statics.createReport = function ({ text, user }) {
  const obj = new this();

  obj.text = text;
  obj.user = user;

  return obj.save();
};

module.exports = mongoose.model("Report", schema, "reports");

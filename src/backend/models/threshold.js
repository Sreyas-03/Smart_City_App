const mongoose = require("../helpers/db");

const schema = mongoose.Schema({
  type: { type: String, required: true },
  maxValue: Number,
  minValue: Number,
  l1: { type: Number, default: Infinity },
  l2: Number
});

schema.statics.createThreshold = function ({ type, maxValue, minValue, l1, l2 }) {
	/*
	 * Create and save threshold values for a given widget type in the database with the supplied parameters.
	 * Note that no validations are performed, do that beforehand.
	 */

	const obj = new this();

	obj.type = type;
	obj.maxValue = maxValue;
	obj.minValue = minValue;
	obj.l1 = l1;
	obj.l2 = l2;

	return obj.save();
};

module.exports = mongoose.model("Threshold", schema, "thresholds");

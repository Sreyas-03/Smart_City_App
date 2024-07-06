const mongoose = require("../helpers/db");

const schema = mongoose.Schema({
	type: { type: String, required: true },
});

schema.statics.createBlockedSensor = function ({ type }) {
	const obj = new this();

	obj.type = type;

	return obj.save();
};

module.exports = mongoose.model("BlockedSensorType", schema, "blockedSensorTypes");

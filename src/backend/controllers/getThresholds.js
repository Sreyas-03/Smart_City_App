const Threshold = require("../models/threshold");

module.exports = (req, res, next) => {
	Threshold.find().then((thresholds) => {
		res.json({ thresholds });
	});
}
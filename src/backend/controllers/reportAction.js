/* POST: {id, action: "resolve" / "delete} */
const Report = require("../models/report");

module.exports = (req, res, next) => {
  const { id, action } = req.body;

  if (!id || !action) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  Report.findById(id).then((report) => {
    if (!report) {
      return res.status(404).json({ error: "Report not found" });
    }

    if (action === "resolve") {
      report.resolved = !report.resolved;
      return report
        .save()
        .then(() => res.json({ success: true }))
        .catch(next);
    }

    if (action === "delete") {
      return Report.findByIdAndRemove(id)
        .then(() => res.json({ success: true }))
        .catch(next);
    }

    return res.status(400).json({ error: "Invalid action" });
  });
};

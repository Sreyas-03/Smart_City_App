// POST: {_id}

const Widget = require("../models/widget");

module.exports = (req, res, next) => {
  const widgetId = req.body._id;

  Widget.findById(widgetId).then((widget) => {
    if (!widget) return res.json({ success: false, error: "Not found" });

    if (
      (widget.user && !widget.user.equals(req.user._id)) ||
      (!widget.user && !req.user.admin)
    )
      return res.json({ success: false, error: "Unauthorised" });

    Widget.findByIdAndRemove(widgetId)
      .then(() => {
        res.json({ success: true });
      })
      .catch(next);
  });
};

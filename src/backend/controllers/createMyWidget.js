/*
 * POST: {type, location, visualisation, isDefault}
 */

const Widget = require("../models/widget");

module.exports = (req, res, next) => {
  const { user } = req;
  const { type, location, visualisation, isDefault } = req.body;

  if (isDefault && !user.admin)
    return res.json({ success: false, error: "Unauthorised" });

  Widget.createWidget({
    user: isDefault ? null : user._id,
    type,
    location,
    visualisation
  })
    .then(() => res.json({ success: true }))
    .catch((err) => next(err));
};

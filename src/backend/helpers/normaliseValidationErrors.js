/*
 * Takes a set of errors generated by express-validator,
 * and normalises it into an object that can be sent to our error handler.
 */

module.exports = (errors) => {
  return { errors: errors.array().map((el) => el.msg) };
};
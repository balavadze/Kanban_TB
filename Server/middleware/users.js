const { validationResult } = require("express-validator");

exports.validationMiddleware = (req, res, next) => {
  // console.log("validationMiddleware");
  let errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }
  next();
};

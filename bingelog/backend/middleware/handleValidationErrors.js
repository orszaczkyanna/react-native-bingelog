// Validation error handler middleware
// Formats and returns validation errors from express-validator

const { validationResult } = require("express-validator");

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);

  // If there are validation errors, return a 400 Bad Request response with the formatted errors
  if (!errors.isEmpty()) {
    // Extract only the relevant fields (message and field name)
    // to prevent leaking sensitive input values (e.g., passwords)
    const formattedErrors = errors.array().map(({ msg, path }) => ({
      msg, // e.g., "Username is required"
      path, // e.g., "username"
    }));

    return res.status(400).json({ errors: formattedErrors });
  }

  // If there are no validation errors, proceed to the next middleware/controller
  return next();
};

module.exports = handleValidationErrors;

// Note: This middleware should be used after validation middlewares like `validateRegister`

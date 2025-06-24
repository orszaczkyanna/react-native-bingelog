// Validation middleware for user-related inputs (e.g. registration, login, profile update)
// Defines reusable input validation rules using express-validator
// These middlewares are used in route files to validate and sanitize incoming request bodies

const { body } = require("express-validator");

// Username validation
const username = body("username")
  .trim()
  .notEmpty()
  .withMessage("Username is required")
  .bail() // Stop running validations if previous one failed
  .isLength({ max: 30 })
  .withMessage("Username must be at most 30 characters long");

// Email validation
const email = body("email")
  .trim()
  .notEmpty()
  .withMessage("Email is required")
  .bail()
  .isEmail()
  .withMessage("Invalid email format")
  .bail()
  .isAscii() // Allow only ASCII characters (standard English letters and symbols)
  .withMessage("Email must contain only ASCII characters")
  .normalizeEmail(); // Sanitize email to a consistent format (e.g., lowercases entire email, removes dots from gmail)

// Password validation (strong password)
const password = body("password")
  .trim()
  .notEmpty()
  .withMessage("Password is required")
  .bail()
  .isStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  })
  .withMessage(
    "Password must be at least 8 characters long and include uppercase, lowercase, number, and symbol"
  );

// Export validation middlewares grouped by use case
module.exports = {
  validateRegister: [username, email, password],
};

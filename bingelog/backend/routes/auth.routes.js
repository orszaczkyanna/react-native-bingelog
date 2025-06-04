// Authentication routes
// Defines API endpoints and maps them to controller functions

const express = require("express");
const { body } = require("express-validator");
const { registerUser } = require("../controllers/auth.controller");

const router = express.Router();

// router.post("/register", registerUser); // Registration route

// Registration route with validation middleware (express-validator)
// Validate and sanitize user input before controller handles registration
router.post(
  "/register",
  [
    body("username")
      .trim()
      .notEmpty()
      .withMessage("Username is required")
      .bail() // Stop running validations if previous one failed
      .isLength({ max: 30 })
      .withMessage("Username must be at most 30 characters long"),

    body("email")
      .trim()
      .notEmpty()
      .withMessage("Email is required")
      .bail()
      .isEmail()
      .withMessage("Email must be in a valid format")
      .bail()
      .isAscii() // Allow only ASCII characters (standard English letters and symbols)
      .withMessage("Email must contain only ASCII characters")
      .normalizeEmail(), // Sanitize email to a consistent format (e.g., lowercases entire email, removes dots from gmail)

    body("password")
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
      ),
  ],
  registerUser
);

module.exports = router;

// Registration routes
// Defines API endpoints and maps them to controller functions

const express = require("express");
const { registerUser } = require("../controllers/register.controller");
const { validateRegister } = require("../middleware/userValidators");
const handleValidationErrors = require("../middleware/handleValidationErrors");

const router = express.Router();

// Register route with input validation middleware → runs validateRegister before registerUser
router.post(
  "/register",
  validateRegister,
  handleValidationErrors,
  registerUser
);

module.exports = router;

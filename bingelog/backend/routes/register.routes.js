// Registration routes
// Defines API endpoints and maps them to controller functions

const express = require("express");
const { validateRegister } = require("../middleware/userValidators");
const { registerUser } = require("../controllers/register.controller");

const router = express.Router();

// Register route with input validation middleware → runs validateRegister before registerUser
router.post("/register", validateRegister, registerUser);

module.exports = router;

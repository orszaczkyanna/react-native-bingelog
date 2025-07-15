// Login routes

const express = require("express");
const { loginUser } = require("../controllers/login.controller");
const { validateLogin } = require("../middleware/userValidators");
const handleValidationErrors = require("../middleware/handleValidationErrors");

const router = express.Router();

// Login route with input validation
router.post("/login", validateLogin, handleValidationErrors, loginUser);

module.exports = router;

// Note:
// POST is preferred for LOGIN to protect sensitive information in the request body
// GET is unsuitable for login because it could expose credentials in the URL, browser history, or logs

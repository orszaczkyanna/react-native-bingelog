// Authentication routes
// Defines API endpoints and maps them to controller functions

const express = require("express");
const router = express.Router();
const { registerUser } = require("../controllers/auth.controller");

router.post("/register", registerUser);

module.exports = router;

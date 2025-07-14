// Refresh token route
// Defines API endpoint for renewing access tokens

const express = require("express");
const router = express.Router();

// Import controller
const {
  handleRefreshToken,
} = require("../controllers/refreshToken.controller");

// Route to handle refresh token requests
// Use POST to avoid exposing the refresh token
router.post("/refresh", handleRefreshToken);

module.exports = router;

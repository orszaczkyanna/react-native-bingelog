// Test route to verify access token functionality (delete later)

const express = require("express");
const router = express.Router();
const { verifyAccessToken } = require("../middleware/verifyAccessToken");

router.get("/test", verifyAccessToken, (req, res) => {
  res.json({ message: "You accessed a protected route", userId: req.userId });
});

module.exports = router;

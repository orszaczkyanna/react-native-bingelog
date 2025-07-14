// Utility functions to generate JWT access and refresh tokens

const jwt = require("jsonwebtoken");

// Generate access token (short-lived)
const generateAccessToken = (userId) => {
  return jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });
};

// Generate refresh token (longer-lived)
const generateRefreshToken = (userId) => {
  return jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });
};

// Generate both tokens
const generateAuthTokens = (userId) => {
  const accessToken = generateAccessToken(userId);
  const refreshToken = generateRefreshToken(userId);
  return { accessToken, refreshToken };
};

module.exports = {
  generateAccessToken,
  generateRefreshToken,
  generateAuthTokens,
};

// Note: Avoid defining functions like `exports.funcName = () => {}` if you need to call them from the same file.
// Instead, define them using `const` or `function` first, then export them at the end.

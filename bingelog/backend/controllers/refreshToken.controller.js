// Refresh token controller
// Verifies refresh token and issues a new access token

const jwt = require("jsonwebtoken");
const dbPool = require("../config/db");
const { generateAccessToken } = require("../utils/tokenUtils");

exports.handleRefreshToken = async (req, res) => {
  try {
    // Destructure `refreshToken` from request body and rename it for clarity
    const { refreshToken: incomingRefreshToken } = req.body;

    // If no token is provided send 401 Unauthorized
    if (!incomingRefreshToken) {
      return res.status(401).json({ message: "Refresh token missing" });
    }

    // Verify refresh token and extract userId
    jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      async (err, decoded) => {
        // If verification fails, send 403 Forbidden
        if (err) {
          return res
            .status(403)
            .json({ message: "Invalid or expired refresh token" });
        }

        const userIdFromToken = decoded.userId;

        // Check if token exists in the DB for that user
        const [userRows] = await dbPool.query(
          "SELECT refresh_token FROM users WHERE id = ?",
          [userIdFromToken]
        );

        const dbRefreshToken = userRows[0]?.refresh_token;

        // If token is not found or doesn't match the one provided, send 403 Forbidden
        if (!dbRefreshToken || dbRefreshToken !== incomingRefreshToken) {
          return res.status(403).json({ message: "Refresh token mismatch" });
        }

        // Generate a new access token
        const newAccessToken = generateAccessToken(userIdFromToken);

        // Return the new access token in the response under the `accessToken` key
        res.status(200).json({ accessToken: newAccessToken });
      }
    );
  } catch (error) {
    console.error("Refresh error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

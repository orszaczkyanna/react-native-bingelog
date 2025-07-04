// Login controller
// Authenticates user credentials and returns access and refresh tokens on success

const dbPool = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

// Load secret keys from environment variables (used for signing tokens)
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET;

// `exports.loginUser` (CommonJS) same as `export const loginUser` (ES modules)
exports.loginUser = async (req, res) => {
  // Handle validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    // Extract data from request body
    const { email, password } = req.body;

    // Look up user by email
    const [userByEmail] = await dbPool.query(
      "SELECT id, email, password FROM users WHERE email = ?",
      [email]
    );

    // Return 401 (Unauthorized) if no user found with the provided email
    if (userByEmail.length === 0) {
      // Return generic error to prevent revealing whether email exists
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Extract the single matching user (email is unique)
    const foundUser = userByEmail[0];

    // Compare provided password with stored hashed password
    const isMatch = await bcrypt.compare(password, foundUser.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate JWT access token with user ID payload (short-lived)
    const accessToken = jwt.sign(
      { userId: foundUser.id },
      ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );

    // Generate refresh token (longer-lived)
    const refreshToken = jwt.sign(
      { userId: foundUser.id },
      REFRESH_TOKEN_SECRET,
      { expiresIn: "7d" }
    );

    // Store refresh token in database (optional, for revocation)
    await dbPool.query("UPDATE users SET refresh_token = ? WHERE id = ?", [
      refreshToken,
      foundUser.id,
    ]);

    // Respond with tokens and user info (omit password)
    res.status(200).json({
      message: "Login successful",
      accessToken, // same as `accessToken: accessToken`
      refreshToken,
      user: { id: foundUser.id },
    });

    // Note: accessToken should be stored in MEMORY on frontend (not in localStorage or cookies)
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

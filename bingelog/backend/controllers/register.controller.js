// Registration controller
// Handles business logic for user registration: validation, hashing, and DB actions

const dbPool = require("../config/db");
const bcrypt = require("bcrypt");

const saltRounds = 10;

exports.registerUser = async (req, res) => {
  // Basic endpoint check (use to verify that routing works)
  /*
  console.log("Request body: ", req.body);
  res.send("Register endpoint works");
  */

  try {
    // Extract data from request body
    const { username, email, password } = req.body;

    // Check if the provided email is already registered in the database
    const [existingUsers] = await dbPool.query(
      "SELECT id FROM users WHERE email = ?",
      [email] // Use a parameterized query to prevent SQL injection attacks
    );
    if (existingUsers.length > 0) {
      return res.status(409).json({ message: "Email is already registered" }); // 409 Conflict
    }

    // Hash the password before storing
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Insert the new user into the database
    await dbPool.query(
      "INSERT INTO users (username, email, password) VALUES (?, ?, ?)",
      [username, email, hashedPassword]
    );

    // Respond with success (omit password from response)
    res.status(201).json({
      message: "User registered successfully",
      user: { username, email },
    });
  } catch (error) {
    console.error("Register error:", error); // For developers: logs detailed error for debugging
    res.status(500).json({ message: "Server error" }); // For users: generic message to avoid exposing internal details
  }
};

// Express app configuration
// Defines base API structure and sets up middleware

const express = require("express"); // same as `import express from "express"`
const app = express();

const authRoutes = require("./routes/auth.routes");

app.use(express.json());

// Mount auth-related endpoints under /api/auth (e.g. /api/auth/register)
app.use("/api/auth", authRoutes);

// Test endpoint to confirm the server is up and responding
/*
app.get("/", (req, res) => {
  res.send("API is running");
});
*/

module.exports = app; // same as `export default app`

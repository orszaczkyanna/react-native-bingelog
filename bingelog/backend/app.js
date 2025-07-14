// Express app configuration
// Defines base API structure and sets up middleware

const express = require("express"); // same as `import express from "express"`
const app = express();

const registerRoutes = require("./routes/register.routes");
const loginRoutes = require("./routes/login.routes");
const refreshRoutes = require("./routes/refresh.routes");

app.use(express.json());

// Mount auth-related endpoints under /api/auth (e.g. /api/auth/register)
app.use("/api/auth", registerRoutes);
app.use("/api/auth", loginRoutes);
app.use("/api/auth", refreshRoutes);

// Test endpoint to confirm the server is up and responding
/*
app.get("/", (req, res) => {
  res.send("API is running");
});
*/

module.exports = app; // same as `export default app`

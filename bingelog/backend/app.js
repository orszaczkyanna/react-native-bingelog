// Express app configuration
// Defines base API structure and sets up middleware

const express = require("express"); // same as `import express from "express"`
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running");
});

module.exports = app; // same as `export default app`

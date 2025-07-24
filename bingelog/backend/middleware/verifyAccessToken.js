// Middleware to verify JWT access token from the Authorization header

const jwt = require("jsonwebtoken");

const verifyAccessToken = (req, res, next) => {
  // Get the "authorization" http header from the request
  const authHeader = req.headers.authorization; // express standardizes header names to lowercase

  // Extract the access token from the header which should be in the form "Bearer <token>"
  const incomingAccessToken = authHeader?.split(" ")[1];

  // If no token is provided, respond with 401 Unauthorized
  if (!incomingAccessToken) {
    return res.status(401).json({ message: "Access token missing" }); // Dev only: detailed message for easier debugging
    // return res.sendStatus(401); // Prod: generic response to avoid info leaks
  }

  // Verify the access token using the secret key and decode it
  jwt.verify(
    incomingAccessToken,
    process.env.ACCESS_TOKEN_SECRET,
    (err, decoded) => {
      // If verification fails, respond with 401 Unauthorized
      if (err) {
        return res
          .status(401)
          .json({ message: "Invalid or expired access token" }); // Dev
        // return res.sendStatus(401); // Prod
      }

      // If verification is successful, attach the decoded userId to the request object
      // This allows downstream handlers to access the req.userId
      req.userId = decoded.userId;

      // Call the next middleware or route handler (continue the request-response cycle)
      next();
    }
  );
};

module.exports = { verifyAccessToken };

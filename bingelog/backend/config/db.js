// MySQL database connection pool using mysql2

require("dotenv").config(); // Only needed when running db.js directly (e.g. for testing)
const mysql = require("mysql2/promise");

// Create a connection pool instead of a single connection
// Pools keep connections open and reuse them, avoiding the overhead of reconnecting
const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Test query to verify the DB connection
async function testQuery() {
  // In CommonJS (require/module.exports), the `await` keyword must be used inside an `async` function
  try {
    // Destructure the first element of the result array, which contains the rows
    const [rows] = await pool.query("SELECT * FROM users");
    console.log(rows);
    // Note: No need to release connection manually when using pool.query()
  } catch (err) {
    console.log(err);
  }
}
// Call the test function
testQuery();

module.exports = pool;

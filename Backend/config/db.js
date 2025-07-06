const { Pool } = require("pg");
require("dotenv").config();

// Check if running in production (Render)
const isProduction = process.env.NODE_ENV === "production";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: isProduction
    ? { rejectUnauthorized: false } // Required for Render
    : false,                        // Disable SSL locally
});

pool.connect()
  .then(() => console.log("📦 Connected to PostgreSQL"))
  .catch((err) => console.error("❌ Database connection error:", err));

module.exports = pool;

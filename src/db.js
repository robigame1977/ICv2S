import mysql from "mysql2/promise";
import config from './config.js'
import r from './functions/functions.js'

const pool = mysql.createPool({
  host: config.environment.databaseHost,
  port: config.environment.databasePort ?? 3306,
  user: config.environment.databaseUsername,
  password: config.environment.databasePassword,
  database: config.environment.databaseName,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  namedPlaceholders: true,
});

(async () => {
  try {
    const connection = await pool.getConnection();
    r.consoleMessages.info("Database connection established!");
    
    // Test a simple query
    const [rows] = await connection.query("SELECT 1 as test");
    //r.consoleMessages.secondary(`Query test passed: ${rows[0].test === 1}`);

    connection.release(); // Crucial: Always release manual connections back to the pool
  } catch (error) {
    r.consoleMessages.error("Database connection failed");
    console.error("Error Code:", error.code); // e.g., ECONNREFUSED
    console.error("Message:", error.message);
  }
})();

export default pool
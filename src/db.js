import mysql from "mysql2/promise";
import dotenv from 'dotenv'
import r from './functions/functions.js'

console.log("Initializing seperate dotenv session for database connection.")
dotenv.config({quiet:true})

throw new Error("Database feature is deprecated. Prioritize use of icv2.js instead.")

const environment = {
    databaseHost: process.env.DATABASE_HOST,
    databasePort: process.env.DATABASE_PORT,
    databaseName: process.env.DATABASE_NAME,
    databaseUsername: process.env.DATABASE_USERNAME,
    databasePassword: process.env.DATABASE_PASSWORD,
  }

const pool = mysql.createPool({
  host: environment.databaseHost,
  port: environment.databasePort ?? 3306,
  user: environment.databaseUsername,
  password: environment.databasePassword,
  database: environment.databaseName,
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
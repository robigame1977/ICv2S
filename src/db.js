import mysql from "mysql2/promise";
import config from './config.js'

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

export default pool
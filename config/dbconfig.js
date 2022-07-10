const mysql = require('mysql');
const env = process.env;

const dbConfig = {
  host: env.DB_HOSTNAME,
  user: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 100,  
}

const poolConn = mysql.createPool(dbConfig);

module.exports = poolConn;
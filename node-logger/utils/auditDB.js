/**
 * Database connection to the audit database of support center
 */

const mysql = require("mysql2");

require('dotenv').config();

const auditPool = mysql.createPool({
    
    connectionLimit : 10,
    host:     process.env.DB_LOCAL_SERVER_IP_ADDRESS,
    port:     process.env.DB_LOCAL_PORT,
    user:     process.env.DB_LOCAL_USER_NAME,
    password: process.env.DB_LOCAL_USER_PW,
    database: process.env.DB_AUDIT_LOCAL_NAME
});

module.exports = auditPool;
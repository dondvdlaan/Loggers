/**
 * Configuration of NodeBE logger to database
 */

const winston           = require('winston')

const MySQLTransport    = require("./mysqlTransport")


const optionsLogger = {
    host:       'localhost',
    user:       'testUser',
    password:   'testPW',
    database:   'support_audit',
    tableName:  'logs'
};

const logger = winston.createLogger({
    
    level: 'debug',
    format: winston.format.json(),
    defaultMeta: { service: 'user-service' },
    transports: [
        new winston.transports.Console({
            format: winston.format.simple(),
        }),
        new MySQLTransport(optionsLogger),
    ],
});

module.exports = logger;
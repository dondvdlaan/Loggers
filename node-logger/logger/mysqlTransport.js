/**
 * Module to create transport from winston logger to mysql database
 */

const transport    = require('winston-transport');
const mySql        = require('mysql2');

/**
 * @constructor
 * @param {Object} options             Options for the MySQL & log plugin
 * @param {String} options.host        Database host
 * @param {String} options.user        Database username
 * @param {String} options.password    Database password
 * @param {String} options.database    Database name
 * @param {String} options.table       Database table for the logs
 */
module.exports = class MySQLTransport extends transport {

    constructor(options = {}) {
        super(options);

        this.options = options || {};

        // check parameters
        if(!options.host){
            throw new Error('The database host is required');
        }
        if(!options.user){
            throw new Error('The database username is required');
        }
        if(!options.password){
            throw new Error('The database password is required');
        }
        if(!options.database){
            throw new Error('The database name is required');
        }
        if(!options.tableName){
            throw new Error('The database table is required');
        }

        const databaseOptions = {
            host:              this.options.host,
            user:              this.options.user,
            password:          this.options.password,
            database:          this.options.database,
            ssl:               false,
            connectionLimit:   5
        }

        this.pool = mySql.createPool(databaseOptions);

    }

    /**
     * Function log (info, callback)
     * 
     * {level, msg, [meta]} = info
     * @level {string} Level at which to log the message.
     * @msg {string} Message to log
     * @meta {Object} **Optional** Additional metadata to attach
     * @callback {function} Continuation to respond to when complete.
     * Core logging method exposed to Winston. Metadata is optional.
     */

   log(info, callback) {

       // Destructure log content
       const { level, message, ...winstonMeta } = info;

       // Compose log object 
       const log = {};
       log.application = "NodeBE";
       log.timestamp   = new Date();
       //log.meta        = winstonMeta;
       log.level       = level.replace(/\u001b\[[0-9]{1,2}m/g, '');
       log.message     = message;

       // Compose sql and values
       const sql = `INSERT INTO ${this.options.tableName} (application, logtime, levelmsg, message) 
                    VALUES (?, ?, ?, ?)`;
       const values = [log.application ,log.timestamp, log.level, log.message];

       process.nextTick(() => {
           // protect
           if (!callback) {
                callback = () => {};
           }

           this.pool.getConnection((err, connection) => {
                
               if (err) {return callback(err, null);}

               // Save the log
               connection.query(sql, values, (err, results, fields) => {
                       
                   if(err){setImmediate(() => {this.emit('error', err);});
                           return callback(err, null);}
                        
                   console.log("Number of records inserted: " + results.affectedRows);
               
               }); // END connection.query

               connection.release();
               
               setImmediate(() => {this.emit('logged', info);});

               callback(null, true);
               
           }); // END pool.getConnection
       }); // END  process.nextTick
   }; // END log()
}; // END MySQLTransport
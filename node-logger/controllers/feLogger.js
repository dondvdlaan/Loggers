const logger  = require("../logger/logger.js");
const daoLogs = require("../daos/daoLogs.js");

/**
 * Module to receives logs from the Frontend and store them in the audit database
 * 
 * @param {Express} server    : Express server passed from main
 * @param {Mysql}   auditPool : Mysql database passed from main 
 */

module.exports = function (server, auditPool) {

    // Save log to db
    server.route('/api/logs').post((req, response) => {
  
      //console.log("/api/logs: " , req.body);

      daoLogs.saveLog(req, auditPool)
      .then(
        result => {
          //console.log("Back from Promise: ", result)
          response.status(200).send(JSON.stringify({ "status": "ok" }));
        },
        rej => { 
          console.log("Err from Promise: ", rej);
          response.status(500).send(JSON.stringify({ "status": "un_ok" }))
        }
      )
    })
  }
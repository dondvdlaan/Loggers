/**
 * Module to receives logs from the Frontend and store them in the audit database
 * 
 * @param {Express} server  : Express server passed from main
 * @param {Mysql}   db      : Mysql database passed from main 
 */
const logger  = require("../logger/logger.js");
const dao     = require("../daos/daoLogs.js");

module.exports = function (server, db) {

    server.route('/api/logs').post((req, res) => {
  
      console.log("/api/logs: " , req.body);

      
      if (dao.saveLog(req, db)) res.status(200).send(JSON.stringify({ "status": "ok" }));
      else res.status(500).send(JSON.stringify({ "status": "un_ok" }));
  /*
      res.status(200).send(JSON.stringify({ "status": "ok" }));
   */   
    })
  }
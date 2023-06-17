const logger    = require("../logger/logger.js");

/**
 * Function to save log to db
 * 
 * @param   req         :   Request received
 * @param   auditPool   :   Database object
 * return   Promise     :   Promise res/rej send back to caller
 */
const saveLog = (req, auditPool) =>{
    
    return new Promise((res, rej) => {

            auditPool.query(
                `INSERT INTO logs (application, logtime, levelmsg, message)
                VALUES( ?, ?, ?, ?)`,
                ["REACT-FE",
                    req.body.timestamp,
                    req.body.levelMsg,
                    req.body.message,
                    ],
                (err, result) => {
                    if (err) {
                        logger.error(err);
                        // Pass err to Promise
                        rej(err);
                    }
                    else {
                        //console.log("Query result: " , result);

                        // Pass result to Promise
                        res(result);
                    }
                });
    }) // END Promise
} // END saveLog

module.exports = {
    saveLog
}
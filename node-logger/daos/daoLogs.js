const logger    = require("../logger/logger.js");

/**
 * Function to save log to db
 * 
 * @param   req             :   Request received
 * @param   db              :   Database object
 * return   saved {boolean} :   Succesful / true, failed / false
 */
const saveLog = (req, db) =>{
    
    let saved = false;

    db.getConnection(function (err, connection) {
          
        if (err) { 
                  logger.error(err);
                  next(new Error(err));
                  return saved = false;
              };
        
        console.log("Date time raw ", req.body.timestamp);

        let timestamp = req.body.timestamp.slice(0,19).replace("T", " ");

        console.log("Date time ",timestamp );

      connection.query(
          `INSERT INTO logs (application, logtime, levelmsg, message)
           VALUES( ?, ?, ?, ?)`,
           ["REACT-FE",
            timestamp,
            req.body.levelMsg,
            req.body.message,
            ],
          (err, result) => {
              if (err) {
                  logger.error(err);
                  throw new Error(err);
                  return saved = false;
              }
              else {
                console.log("Query result: " , result);

                
              }
          }
      );
      connection.release();
    });
    return saved = true;
}







module.exports = {
    saveLog
}
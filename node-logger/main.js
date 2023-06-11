// ---- Dependencies ----
const express       = require("express");
const server        = express();

const cors          = require("cors");
//const morgan        = require("morgan");
//const cookieParser  = require("cookie-parser");
const bodyParser    = require("body-parser");

// ---- Modules ----
const logger    = require("./logger/logger");
const auditPool = require("./utils/auditDB.js");
const feLogger  = require("./controllers/feLogger.js");


// ---- Constants ----
const serverPort = 5555;

// ---- Middleware ----
// req.body is populated 
server.use(bodyParser.json());
// CORS
server.use(cors());


/**
 * Initialisation NodeBE
*/
const init = () => {
    /*
    try {
        nonExistentFunction();
      } catch (err) {
        logger.error(err);
        // Expected output: ReferenceError: nonExistentFunction is not defined
        // (Note: the exact output may be browser-dependent)
      }
      */
    
    // Initialise Controller FE logger
    //routes(server, pool);
    feLogger(server, auditPool);
    
    // ---- Starting up Node backend ----
    server.listen(serverPort, () => {
        
        //console.log(`File ${process.env.ENV_FILE} loaded.\n`);
        console.log(`Server listening at ${serverPort}\n`);
        logger.info('Server started');
    });
}

init();
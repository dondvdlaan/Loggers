import { Method } from "axios";
import { ApiSimplified } from "./Api";

/**
 * Logger object consisting of different functions for each message level 
 */
export const logger = {

    info: (message: any) => {

        //console.log({message})
        
        const log: {} = {
                timestamp: getTimestamp(),
                levelMsg: "INFO",
                message: message.message
            }

        sendLogToDB(log);
    },
    error: (message: any) => {

        //console.log({message})
        
        const log: {} = {
                timestamp: getTimestamp(),
                levelMsg: "ERROR",
                message: message.message
            }
        sendLogToDB(log);
    } 
}

/**
 * Function to produce tiemstamp in format "2023-06-18 11:03:35"
 */
const getTimestamp = () => {

    let today = new Date();

    let timestamp = today.getFullYear() + "-";
        timestamp += today.getMonth() + 1 + "-";  
        timestamp += today.getDate() + " ";  
        timestamp += today.getHours() + ":";  
        timestamp += today.getMinutes().toString().padStart(2,'0') + ":";  
        timestamp += today.getSeconds().toString().padStart(2,'0'); 

    return timestamp;
}

/**
 * Function to log message to database via node-logger backend
 */
const sendLogToDB = (log: {} )=> {

    // Send Log to DB
    const [method, path]:[Method, string] = ["POST", `api/logs`];

    ApiSimplified(method, path, log)
    .then((res)=> console.warn("back from Api logging: ", res))
    .catch(err=> console.log(err))
}


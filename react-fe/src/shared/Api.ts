import axios, { Method } from "axios";

// ********************* Constanten und Typen *********************
const baseUrl = `http://localhost:5555/`;

/**
 * Simplified Api for direct calling server and without callback function
 * 
 * @param   method  [Method]      : http method
 * @param   path    [string]      : relative path to baseUrl
 * @param   data    [JSON]        : optionally data can be send with message
 * @return  axios   [AxiosPromise]: return message to be captured with .then
 */
export function ApiSimplified<T>(method: Method, path: string, data = {}) {

    const config ={
        method,
        url: `${baseUrl}${path}`,
        data,
    } ;

    console.log('API simple config:',config);
    
    return axios(config)
    // .then((response: AxiosResponse<T>) => response.data);
    // .then((response: AxiosResponse<T>) => console.log('response.data: ', response.data));
}
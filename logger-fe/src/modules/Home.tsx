import { ApiSimplified } from "../shared/Api"
import useErrorHandler from "./errorHandling/ErrorHandler";



export const Home = () =>{

    const setVisibleError = useErrorHandler();

    const onTestApi = () =>{
        ApiSimplified("GET", "api/updateUsers")
        .then(res => console.log({res}))
        .catch(err =>{
            console.log("err: ", err.response.data.error)
            setVisibleError(`${err.response.data.error}`, err," Please contact the IT department") ;
        })
    }

    return(
        <div>
            <p>Test API</p>
        <button onClick={onTestApi} >
        Testing
      </button> 
        </div>
       
    )
}
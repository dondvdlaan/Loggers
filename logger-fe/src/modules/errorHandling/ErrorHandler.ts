import { useContext } from "react";
import ErrorHandlerContext from "./ErrorHandlerContext";



const useErrorHandler = () => useContext(ErrorHandlerContext);

export default useErrorHandler;
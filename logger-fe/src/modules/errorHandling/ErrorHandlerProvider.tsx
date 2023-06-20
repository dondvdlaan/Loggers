import ErrorHandlerContext from "./ErrorHandlerContext";

interface Props{
    callback: (title: any, err: any, action: any) => void
    children: any
}

let setError = (title: any, err: any, action: any) => {};

export default (props: Props) => {

if(props.callback){

    setError = props.callback;
}

return(
<ErrorHandlerContext.Provider value = {setError}>
    {props.children}
</ErrorHandlerContext.Provider>
);
};
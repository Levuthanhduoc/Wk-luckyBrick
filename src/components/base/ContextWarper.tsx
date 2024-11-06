import { createContext, ReactElement} from "react";

interface props{
    children:ReactElement,
    value:unknown
}
const Context = createContext<unknown>(null)
function ContextWarper(props:props){
    return(
        <Context.Provider value={props.value}>
            {props.children}
        </Context.Provider>
    )
}

export {ContextWarper,Context}
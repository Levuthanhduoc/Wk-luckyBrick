import { FormControl, FormLabel, SxProps, TextField } from "@mui/material"
import { useState } from "react"
import upperCaseFirstLetter from "../../assets/module/upperCaseFirstletter"

interface propsType{
    sx?:SxProps,
    name:string,
    value?:string|number,
}
export default function NumberForm (props:propsType){
    const [isError,setError] = useState(false)
    const [errorMessage,setErrorMessage] = useState<string|null>(null)
    
    const onChange = (e:React.ChangeEvent<HTMLInputElement>)=>{
        const value = e.target.value
        if(isNaN((value as unknown)as number)){
            setError(true)
            setErrorMessage("Please enter number")
        }else{
            setError(false)
            setErrorMessage(null)
        }
    }

    return(
        <>
        <FormControl>
              <FormLabel htmlFor={props.name}>{upperCaseFirstLetter(props.name)}</FormLabel>
              <TextField
                value={props.value||""}
                error={isError}
                helperText={errorMessage}
                id={props.name}
                type="number"
                name={props.name}
                placeholder="0"
                autoComplete={props.name}
                autoFocus
                required
                fullWidth
                variant="outlined"
                color={isError ? 'error' : 'primary'}
                onChange={onChange}
              />
            </FormControl>
        </>
    )
}
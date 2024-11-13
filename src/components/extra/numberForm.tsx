import { FormControl, FormLabel, SxProps, TextField } from "@mui/material"
import {  useState } from "react"
import upperCaseFirstLetter from "../../assets/module/upperCaseFirstletter"

interface propsType{
    sx?:SxProps,
    name:string,
    value?:string|number,
}
export default function NumberForm (props:propsType){
    const [isError,setError] = useState(false)
    const [errorMessage,setErrorMessage] = useState<string|null>(null)
    const [value,setValue] = useState(props.value||0)
    
    const onChange = (e:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
        const input = e.target.value
        e.preventDefault()
        if(isNaN((input as unknown)as number)){
            setError(true)
            setErrorMessage("Please enter number")
        }else{
            setError(false)
            setErrorMessage(null)
            setValue(input)
        }
    }

    return(
        <>
        <FormControl>
              <FormLabel htmlFor={props.name}>{upperCaseFirstLetter(props.name)}</FormLabel>
              <TextField
                value={value}
                error={isError}
                helperText={errorMessage}
                id={props.name}
                type="number"
                name={props.name}
                placeholder="1000"
                autoComplete={props.name}
                autoFocus
                required
                fullWidth
                variant="outlined"
                color={isError ? 'error' : 'primary'}
                onChange={(e)=>onChange(e)}
              />
            </FormControl>
        </>
    )
}
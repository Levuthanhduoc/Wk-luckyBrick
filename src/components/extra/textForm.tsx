import { FormControl, FormLabel, SxProps, TextField } from "@mui/material"
import upperCaseFirstLetter from "../../assets/module/upperCaseFirstletter"

interface propsType{
    sx?:SxProps,
    name:string,
    value?:string,
}
export default function TextForm (props:propsType){

    return(
        <>
        <FormControl>
              <FormLabel htmlFor={props.name}>{upperCaseFirstLetter(props.name)}</FormLabel>
              <TextField
                value={props.value||""}
                id={props.name}
                type="text"
                name={props.name}
                placeholder="some text"
                autoComplete={props.name}
                autoFocus
                required
                fullWidth
                variant="outlined"
              />
            </FormControl>
        </>
    )
}
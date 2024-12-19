import { FormControl, FormLabel, Rating, SxProps, TextField} from "@mui/material"
import upperCaseFirstLetter from "../../assets/module/upperCaseFirstletter"
import { useState } from "react"

interface propsType{
    sx?:SxProps,
    name:string,
    value?:string,
}
export default function RatingForm (props:propsType){
    const [value,setValue] = useState(props.value||"")
    return(
        <>
        <FormControl>
            <FormLabel htmlFor={props.name}>{upperCaseFirstLetter(props.name)}</FormLabel>
            <TextField
                sx={{width:"0",height:"0",opacity:"0",display:"none"}}
                value={value}
                id={props.name}
                type="text"
                name={props.name}
                variant="outlined"
                />
            <Rating sx={{...props.sx}}
                name="simple-controlled"
                value={Number(value)}
                onChange={(_event, newValue) => {
                setValue(`${newValue}`);
                }}
            />
        </FormControl>
        </>
    )
}
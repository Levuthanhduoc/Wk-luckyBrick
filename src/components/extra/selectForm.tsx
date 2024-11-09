import { FormControl, FormLabel, MenuItem, Select, SxProps,} from "@mui/material"
import { useState } from "react"
import upperCaseFirstLetter from "../../assets/module/upperCaseFirstletter"

interface propsType{
    sx?:SxProps,
    name:string,
    value?:unknown[],
    default?:unknown
}
export default function SelectForm (props:propsType){
    const [value,setValue] = useState<unknown>(props.default||"")
    return(
        <>
        <FormControl>
            <FormLabel htmlFor={props.name}>{upperCaseFirstLetter(props.name)}</FormLabel>
            <Select
                labelId={`${props.name}-label`}
                id={props.name}
                value={value}
                onChange={(e)=>setValue(e.target.value as unknown)}
                autoWidth
                label="Age"
                >
                <MenuItem value="">
                    <em>None</em>
                </MenuItem>
                {props.value&&props.value.map((v)=><MenuItem key={v as string} value={v as string}>{v as string}</MenuItem>)}
            </Select>
        </FormControl>
        </>
    )
}
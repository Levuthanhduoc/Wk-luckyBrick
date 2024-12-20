import { FormControl, FormLabel, Stack, SxProps, TextField } from "@mui/material";
import { LocalizationProvider, MobileDateTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import upperCaseFirstLetter from "../../assets/module/upperCaseFirstletter";
import { useState } from "react";
interface propsType{
    sx?:SxProps,
    name:string,
    value?:string,
}
export default function DateForm (props:propsType){
    const timenow = new Date().toISOString()
    const [value,setValue] = useState<string|undefined>(props.value||timenow)
    return(
        <>
            <Stack>
                <FormControl>
                <FormLabel htmlFor={props.name}>{upperCaseFirstLetter(props.name)}</FormLabel>
                <TextField
                    sx={{display:"none"}}
                    value={value}
                    id={props.name}
                    type="text"
                    name={props.name}
                    placeholder="some text"
                />
                </FormControl>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <MobileDateTimePicker onChange={(e)=>setValue(e?.toISOString())} sx={{...props.sx||""}} defaultValue={dayjs(value)} />
                </LocalizationProvider>
            </Stack>
        </>
    )
}
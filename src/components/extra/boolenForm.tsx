import { Checkbox, FormControl, FormControlLabel, Stack, SxProps, TextField} from "@mui/material"
import upperCaseFirstLetter from "../../assets/module/upperCaseFirstletter"
import { useState } from "react"

interface propsType{
    sx?:SxProps,
    name:string,
    value?:boolean,
}
export default function BooleanForm (props:propsType){
    const [value,setValue] = useState<boolean>(props.value||false)
    return(
        <>
            <Stack>
                <FormControl>
                    <TextField
                        sx={{display:"none"}}
                        value={value}
                        id={props.name}
                        type="text"
                        name={props.name}
                        placeholder="some text"
                    />
                    </FormControl>
                <FormControlLabel control={<Checkbox id={props.name} onChange={()=>setValue(!value)} checked={value} />} label={upperCaseFirstLetter(props.name)} />
            </Stack>
        </>
    )
}
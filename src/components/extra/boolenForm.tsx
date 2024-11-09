import { Checkbox, FormControlLabel, SxProps} from "@mui/material"
import upperCaseFirstLetter from "../../assets/module/upperCaseFirstletter"

interface propsType{
    sx?:SxProps,
    name:string,
    value?:boolean,
}
export default function BooleanForm (props:propsType){
    return(
        <>
            <FormControlLabel control={<Checkbox id={props.name} checked={props.value} />} label={upperCaseFirstLetter(props.name)} />
        </>
    )
}
import { Checkbox, FormControl, FormControlLabel, FormGroup} from "@mui/material"
import { Dispatch, SetStateAction } from "react";
import { useTranslation } from "react-i18next"

interface checkProps {
    items:Array<{
        label:string,
        name:string,
        checked:boolean
    }>,
    setItems:Dispatch<SetStateAction<{ label: string; name: string; checked: boolean; }[]>>,
}

export function ThemeChecker(props:checkProps){
    const {t}= useTranslation()
    return(
        <>
            <FormControl component="fieldset" variant="standard">
                <FormGroup>
                    {Array.isArray(props.items)&&props.items.map((item,index)=>{
                        return(
                            <FormControlLabel
                                control={
                                    <Checkbox checked={item.checked} onChange={(e)=>{
                                        const newItem = [...props.items]
                                        newItem[index]={...item,checked:e.target.checked}
                                        props.setItems(newItem)
                                    }} name={item.name}/>
                                }
                                label={t(item.label)}
                            />
                        )
                    })}
                </FormGroup>
            </FormControl>
        </>
    )
}
import { Box, Slider, Stack, Typography } from "@mui/material";
import moneyConvert from "../../../assets/module/moneyConvert";
import { useTranslation } from "react-i18next";

interface sliderProps{
    priceRange:number[],
    setPriceRange:Function,
    min:number,
    max:number
}

export function Moneyslider(props:sliderProps){
    const { t,i18n } = useTranslation()
    return(
        <Box>
            <Slider
                value={props.priceRange}
                onChange={(_e,newValue)=>props.setPriceRange(newValue)}
                valueLabelDisplay="auto"
                min={props.min}
                max={props.max}
                disableSwap
            />
            <Stack direction={"row"} spacing={"5px"}>
                <Typography>{t("common.price")}:</Typography>
                {Array.isArray(props.priceRange)?props.priceRange.map((value,index)=>
                        <Typography key={index} sx={{border:"black 1px solid",padding:"1px"}}>{t("conversion.money",{value:moneyConvert(value,i18n.language)})}{index==0?" - ":""}</Typography>
                ):""}

            </Stack>
        </Box>
    )
}
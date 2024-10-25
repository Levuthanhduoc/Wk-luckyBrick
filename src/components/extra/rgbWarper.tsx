import { Box, SxProps} from "@mui/material";
import CS from '../../assets/css/component.module.css'
import { useState } from "react";

interface props{
    sx?:SxProps
    children?:any
}

function RgbWaper(props:props){
    const [hover,setHover] = useState(false)
    return (
        <>
           <Box sx={{...props.sx,position:"relative",display:"flex",justifyContent:"center",alignItems:"center"}} 
                onMouseOver={()=>{setHover(true)}} 
                onMouseOut={()=>{setHover(false)}}>
                <Box className = {`${CS.borderGaming} ${hover&&CS.borderGamingHover}`} sx={{borderRadius:"5px"}}/>
                {props.children}
            </Box>
        </>
    )
}

export default RgbWaper
import { Box, Typography } from "@mui/material"

import CS from '../../../assets/css/component.module.css'
import { useState } from "react"

interface props{
    sx?:Object,
}
function GameCard (props:props){
    const [hover,setHover] = useState(false)

    return(
        <>
             <Box sx={{...props.sx,position:"relative",display:"grid",placeItems:"center"}} 
                onMouseOver={()=>{setHover(true)}} 
                onMouseOut={()=>{setHover(false)}}>
                <Box className = {`${CS.borderGaming} ${hover&&CS.borderGamingHover}`} sx={{borderRadius:"5px"}}/>
                <Box sx={{position:"relative"}}>
                    <Box>
                        <Typography>
                            game title
                        </Typography>
                    </Box>
                    <Box>
                        <img></img>
                    </Box>
                    <Box className = {"moreInfo"} sx={{position:"absolute"}}></Box>
                </Box>
            </Box>
        </>
    )
}

export default GameCard
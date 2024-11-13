import { Box, Grow, IconButton, SxProps, Typography } from "@mui/material"
import RgbWaper from "../../extra/rgbWarper"
import { SportsEsports } from "@mui/icons-material"
import { useState } from "react"

import CS from '../../../assets/css/component.module.css'
import { useNavigate } from "react-router-dom"
import { JSONContent } from "@tiptap/core"
import { getHtml } from "../../extra/richTextForm"
import Parser from 'html-react-parser';

interface props{
    sx?:SxProps,
    picture:string,
    name:string,
    id:string,
    description?:JSONContent
}
function GameCard (props:props){
    const [hover,setHover] = useState(false)
    const navigation = useNavigate()
    return(
        <>
            <RgbWaper sx={props.sx}>
                <Box sx={{flex:1,display:"flex",flexDirection:"column",position:"relative",margin:"1px",backgroundColor:"black",borderRadius:"5px"}}
                    onMouseOver={()=>{setHover(true)}} 
                    onMouseOut={()=>{setHover(false)}}
                >
                    <Grow in={hover}>
                        <Box sx={{position:"absolute",height:"100%",width:"100%",display:"grid",placeItems:"center",zIndex:2}}>
                            {props.id&&<IconButton onClick={()=>navigation(`${props.id}`)}>
                                <SportsEsports/>
                            </IconButton>}
                        </Box>
                    </Grow>
                    <Box sx={{height:"20%",display:"grid",placeItems:"center"}}>
                        <Typography>
                            {props.name}
                        </Typography>
                    </Box>
                    <Box sx={{flex:1,margin:"0 1% 5% 1%",position:"relative",backgroundColor:"#262626"}}>
                        <img  className={CS.shopCardImage} src={props.picture}></img>  
                    </Box>
                    <Box className = {"moreInfo"} sx={{
                        position:"absolute",
                        backgroundColor:"inherit",
                        height:`${hover?"100%":"0"}`,width:"100%",
                        top:"100%",left:"0",
                        transition: "width 0.5s ease-in-out,height 0.5s ease-in-out,opacity 0.5s ease-in-out",
                        overflow:"hidden",
                        zIndex:1,
                        borderRadius:"5px",
                        opacity:`${hover?1:0}`
                    }} >
                        <Box sx={{backgroundColor:"#262626",display:"grid",placeItems:"center"}}>GameInfo</Box>
                        <Box sx={{fontSize:"0.8em"}}>{props.description?Parser(getHtml(props.description)):""}</Box>
                    </Box>
                </Box>
            </RgbWaper>
        </>
    )
}

export default GameCard
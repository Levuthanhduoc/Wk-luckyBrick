import { Box, CssBaseline, Grow, IconButton, Stack, SxProps, Typography } from "@mui/material"

import CS from '../../../assets/css/component.module.css'
import { useState } from "react"
import { Handyman } from "@mui/icons-material"

import legoICon from "../../../assets/image/icon/lego.svg"
import { useNavigate } from "react-router-dom"

interface items{
    id:number
    picture:string,
    name:string,
    serial:string|number
}
interface props{
    sx?:SxProps,
    items:items
}

function GuideCard(props:props){
    const [hover,setHover] = useState(false)
    const navigation = useNavigate()
    return(
        <>
            <CssBaseline/>
            <Box sx={{...props.sx,position:"relative",display:"grid",placeItems:"center"}} 
                onMouseOver={()=>{setHover(true)}} 
                onMouseOut={()=>{setHover(false)}}>
                <Box className = {`${CS.borderGaming} ${hover&&CS.borderGamingHover}`} sx={{borderRadius:"5px"}}/>
                <Stack display={"flex"} justifyContent={"center"} alignItems={"center"} sx={{width:"99%",height:"99%",backgroundColor:"black" ,position:"relative",borderRadius:"5px"}}>
                    <img style={{position:"absolute",bottom:"5%",left:"5%",zIndex:1,width:"15%"}} src={legoICon}></img>
                    <Box sx={{
                        position:"absolute",
                        top:0,left:0,
                        display:"flex",
                        width:"100%",height:"70px"
                    }}>
                        <Box sx={{height:"100%",width:"30%",backgroundColor:"black"}}/>
                        <Box sx={{width:"0",height:"0",borderRight:"50px solid transparent",borderTop:"70px solid black"}}/>
                    </Box>
                    <Box sx={{
                        position:"absolute",
                        bottom:0,right:0,
                        display:"flex",
                        justifyContent:"end",
                        width:"100%",height:"70px"
                    }}>
                        <Box sx={{width:"0",height:"0",borderLeft:"50px solid transparent",borderRight:"100px solid black",borderTop:"70px solid transparent"}}/>
                        <Box sx={{height:"100%",width:"40%",backgroundColor:"black"}}/>
                    </Box>
                    <Typography sx={{position:"absolute",top:"5%",left:"5%",fontWeight:"bolder"}}>{props.items.serial}</Typography>
                    <Typography sx={{position:"absolute",bottom:"5%",right:"5%",fontWeight:"bolder"}}>{props.items.name}</Typography>
                    <Box sx={{backgroundColor:"#262626",width:"90%",height:"90%"}}>
                        <img className={CS.shopCardImage} src={props.items.picture}></img>
                        <Grow in={hover}  timeout={500}>
                            <IconButton sx={{ position:"absolute",top:"45%",left:"45%"}} onClick={()=>navigation(`${props.items.id}`)}><Handyman/></IconButton>
                        </Grow>
                    </Box>
                </Stack>
            </Box>
        </>
    )
}

export default GuideCard
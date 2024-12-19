import { ArrowBack, ArrowForward, KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material"
import { Box, Button, Stack, SxProps, Typography } from "@mui/material"
import { memo, ReactElement, useState } from "react"
interface props{
    sx?:SxProps,
    item:{
        name:string,
        picture: string,
        description:string[]
    }[]
}

const DirectionButton = memo((prop:{
        icon:ReactElement,
        hoverIcon:ReactElement,
        onClick?:()=>void,
        disable?:boolean
    })=>{
    const [hover,sethover] = useState(false)
    const directionButtonCss ={
        backgroundColor:"transparent",
        border:"rgb(173, 166, 166) 2px solid",
        color:"white",
        borderRadius:"25px",
        height:"48px",width:"48px",
        cursor:"pointer"
    }
    return(
        <Box component={"button"}
            onMouseEnter={()=>!prop.disable&&sethover(true)} 
            onMouseLeave={()=>sethover(false)}
            onClick={!prop.disable?prop.onClick:()=>{}}
            sx={{...directionButtonCss,opacity:`${prop.disable?"0.5":"1"}`,cursor:`${!prop.disable?"pointer":""}`}}
        >{hover&&!prop.disable?prop.hoverIcon:prop.icon}</Box>
    )
})

export default memo(function LegoMOC(props:props){
    const [positionProp,setPositionProp] =useState({pos:0,maxPos:props.item.length - 1})

    const moveShowcase = (pos:"left"|"right")=>{
        let newPos = positionProp.pos
        const maxPos = props.item.length - 1
        if(pos == "left"){
            newPos = newPos - 1
        }else if(pos == "right"){
            newPos = newPos + 1
        }
        if(newPos <0){
            newPos = maxPos
        }else if(newPos > maxPos){
            newPos = 0
        }
        setPositionProp({pos:newPos,maxPos:maxPos})
    }
    const directionButtons = [
        {
            icon:<KeyboardArrowLeft/>,
            hoverIcon:<ArrowBack/>,
            onClick:()=>moveShowcase("left"),
        },
        {
            icon:<KeyboardArrowRight/>,
            hoverIcon:<ArrowForward/>,
            onClick:()=>moveShowcase("right"),
        }
    ]
    return(
        <Box sx={{backgroundColor:"Black"}} display={"flex"} justifyContent={"center"} alignItems={"center"}
            flexDirection={"column"}
            height={{xs:"1350px",md:"800px"}} padding={"64px 32px 64px 32px"} gap={"10px"}
        >   
            <Box flex={1} display={"flex"} justifyContent={"center"} alignItems={"center"}>
                {props.item.map((item,index)=>
                    <Stack key={index} display={index==positionProp.pos?"flex":"none"} 
                        direction={{xs:"column",md:"row"}} justifyItems={"center"} alignItems={"center"} gap={"48px"}
                    >
                        <Box flex={1}  display={"flex"} justifyContent={"center"}>
                            <Box sx={{maxWidth:"500px"}}>
                                <Box component={"img"} src={item.picture} 
                                    sx={{objectFit:"contain",objectPosition:"center",width:"100%"}}
                                />
                            </Box>
                        </Box>
                        <Box flex={1} display={"flex"} flexDirection={"column"} gap={"10px"}>
                            <Typography fontWeight={700}>Lego inspiration 🔥</Typography>
                            <Typography fontSize={"18px"} fontWeight={600}>{item.name}</Typography>
                            <Box>
                                {item.description.map((line,index)=>
                                    <Typography key={index}>{line}</Typography>
                                )}
                            </Box>
                            <Button variant="outlined" color="inherit" sx={{width:"200px"}}>View More</Button>
                        </Box>
                    </Stack>
                )}
            </Box>
            <Stack direction={"row"} gap={"10px"}>
                {directionButtons.map((item,index)=>
                    <DirectionButton 
                    key={index} 
                    icon={item.icon} 
                        hoverIcon={item.hoverIcon}
                        onClick={item.onClick}
                    />
                )}
            </Stack>
        </Box>
    )
})
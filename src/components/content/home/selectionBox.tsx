import { ArrowBack, ArrowForward, KeyboardArrowLeft, KeyboardArrowRight} from "@mui/icons-material";
import { Box, Stack, Typography } from "@mui/material";
import { memo, ReactElement,useRef, useState } from "react";

interface props{
    title:string
    items:{name:string,picture:string,icon:string}[]
}
const DirectionButton = memo((prop:{
        icon:ReactElement,
        hoverIcon:ReactElement,
        onClick?:()=>void,
        disable?:boolean,
        direction:"left"|"right",
    })=>{
    const [hover,sethover] = useState(false)
    const directionButtonCss ={
        backgroundColor:"transparent",
        border:"rgb(173, 166, 166) 2px solid",
        color:"white",
        position:"absolute",
        top:"calc(50% - 24px)",
        borderRadius:"25px",
        height:"48px",width:"48px",
        cursor:"pointer"
    }
    const addSide = prop.direction =="left"?
        {left:0}:{right:0}
    return(
        <Box component={"button"}
            onMouseEnter={()=>!prop.disable&&sethover(true)} 
            onMouseLeave={()=>sethover(false)}
            onClick={!prop.disable?prop.onClick:()=>{}}
            sx={{...directionButtonCss,...addSide as {},opacity:`${prop.disable?"0.5":"1"}`,cursor:`${!prop.disable?"pointer":""}`}}
        >{hover&&!prop.disable?prop.hoverIcon:prop.icon}</Box>
    )
})

export default memo(function SelectionBox(props:props){
    const [positionProp,setPositionProp] =useState({pos:0,click:0,maxClick:0})
    const pictureBoxRef = useRef<HTMLDivElement|null>(null)
    const pictureListRef = useRef<HTMLDivElement|null>(null)
    
    const calculatingMoveSpace = () =>{
        const themeShowCase = document.querySelector(".theme-showcase")
        if(!themeShowCase || !pictureListRef.current){
            return 0
        }
        const listBound = pictureListRef.current.getBoundingClientRect()
        const themeBoxBound = themeShowCase.getBoundingClientRect()
        const movespace =  ((themeBoxBound.width +10) / listBound.width)*100
        return movespace
    }

    const calculatingClick = (spacePerClick:number) =>{
        if(!pictureBoxRef.current||!pictureListRef.current){
            return 0
        }
        const boxBound = pictureBoxRef.current.getBoundingClientRect()
        const listBound = pictureListRef.current.getBoundingClientRect()
        const numberOfBox = (listBound.width/boxBound.width) - 1
        //get number of box need to be fill by click, first box always be fill so skip that
        if(numberOfBox == 0){
            return 0
        }
        const numberToFillABox = (boxBound.width/(listBound.width*spacePerClick))
        return Math.ceil(numberToFillABox * numberOfBox)
    }

    const moveShowcase = (pos:"left"|"right")=>{
        let newPos = 0
        const oldMaxClick = positionProp.maxClick
        const movePerClick = calculatingMoveSpace()
        const updateMaxClick = calculatingClick((movePerClick/100)||0.1)
        let updateClick = positionProp.click
        if(pos == "left"){
            newPos = positionProp.pos - movePerClick
            updateClick = updateClick - 1
        }else if(pos == "right"){
            newPos = positionProp.pos + movePerClick
            updateClick = updateClick + 1
        }
        if(oldMaxClick != updateMaxClick){
            const correction = oldMaxClick - updateMaxClick 
            updateClick = updateClick - correction
            newPos = movePerClick*updateClick
        }
        if(updateClick > updateMaxClick){
            updateClick = updateMaxClick
            newPos = updateClick * movePerClick
        }
        if(updateClick < 0 || newPos < 0){
            updateClick = 0
            newPos = 0
        }
        setPositionProp({
            pos:newPos,
            click:updateClick,
            maxClick:updateMaxClick})
    }
    const directionButtons = [
        {
            icon:<KeyboardArrowLeft/>,
            hoverIcon:<ArrowBack/>,
            onClick:()=>moveShowcase("left"),
            direction:"left",
            isDisable:positionProp.click == 0},
        {
            icon:<KeyboardArrowRight/>,
            hoverIcon:<ArrowForward/>,
            onClick:()=>moveShowcase("right"),
            direction:"right",
            isDisable:(positionProp.click == positionProp.maxClick)&&(positionProp.maxClick != 0)
        }
    ]

    return(
        <Box margin={"80px 0 80px 0"} position={"relative"} display={"flex"} flexDirection={"column"} gap={"48px"}>
            <Stack direction={"row"} alignItems={"center"} justifyContent={"space-between"}>
                <Typography component={"h2"} sx={{fontSize:"1.75rem",lineHeight:"1.1",fontWeight:"600"}}>{props.title}</Typography>
            </Stack>
            <Box ref={pictureBoxRef} position={"relative"} height={"150px"} overflow={"hidden"}>
                <Stack ref={pictureListRef} direction={"row"} gap={"10px"} position={"absolute"} 
                    sx={{transform:`translate(${-positionProp.pos}%)`,transition:"transform 0.3s ease-in-out",left:0}}
                >
                    {props.items.map((item,index)=>
                        <Box className = {`theme-showcase ${item.name}`} key ={index} position={"relative"} width={"300px"} borderRadius={"5px"} overflow={"hidden"}> 
                            <Box component={"img"} src={item.picture} width={"100%"} sx={{objectFit:"contain",objectPosition:"center"}}/>
                            <Box position={"absolute"} top={0} left={0} width={"100%"} display={"flex"} flexDirection={"row"} justifyContent={"center"}
                                sx={{backgroundColor:"rgba(255,255,255,0.2)"}}
                            >
                                <Box component={"img"} height={"30px"} src={item.icon}/>
                            </Box>
                        </Box>
                    )}
                </Stack>
                {directionButtons.map((item,index)=>
                    <DirectionButton 
                        key={index} 
                        icon={item.icon} 
                        hoverIcon={item.hoverIcon}
                        onClick={item.onClick}
                        disable={item.isDisable}
                        direction={item.direction as "left"|"right"}
                    />
                )}
            </Box>
        </Box>
    )
})
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import { Box, CircularProgress, Stack } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import ad1 from '../../assets/image/banner/ad1.png'
import ad2 from '../../assets/image/banner/ad2.png'
import ad3 from '../../assets/image/banner/ad3.png'
import ad4 from '../../assets/image/banner/ad4.png'

const banner = [
    {name:"banner1",picture:ad1},
    {name:"banner2",picture:ad2},
    {name:"banner3",picture:ad3},
    {name:"banner4",picture:ad4},
]

export default function AdBanner(prop:{item?:{name:string,picture:string}[]}){
    const bannerContent = prop.item||banner
    const bannerTimer = 5000
    const [bannerShow,setBannerShow] = useState(0)
    const bannerRef = useRef<HTMLDivElement|null>(null)
    const [customCursorShow,setCustomCusorShow] = useState(false)
    const [customCursorDirection,setCustomCusorDirection] = useState<"left"|"right">("left")
    const [customCursorAvoid,setCustomCusorAvoid] = useState(false)
    const [customCursortimer,setCustomCusorTimer] = useState(1)
    const customCursor = useRef<HTMLButtonElement|null>(null)
    

    const switchBanner = async()=>{
        if(bannerShow == bannerContent.length - 1){
            setBannerShow(0)
        }else{
            setBannerShow(bannerShow + 1)
        }
    }
    const cursorProgess = ()=>{
        const whenShow = customCursortimer >= 1 && customCursorShow
        const whenNotShow = customCursortimer >= 0 && !customCursorShow
        if(customCursortimer >= 100){
            switchBanner()
            setCustomCusorTimer(0)
        }else if(whenShow || whenNotShow){
            setCustomCusorTimer(customCursortimer + 1)
        }
    }
    const onMousemove = (e:MouseEvent)=>{
        const doc = document.querySelector("body")
        if(customCursor.current && bannerRef.current && doc){
            const bannerPos = bannerRef.current.getBoundingClientRect() 
            const PosX = e.clientX - bannerPos.left - 25
            const PosY = e.clientY - bannerPos.top -25
            const bannerXMax = bannerPos.width - bannerPos.left  + 25
            const cursorPosistion = PosX > bannerXMax/2?"right":"left"
            setCustomCusorDirection(cursorPosistion)
            customCursor.current.style.translate = `${PosX}px ${PosY}px`
        }
    }

    const onTransistionEnd = (e:TransitionEvent)=>{
        if(!e.target){
            return
        }
        const element = e.target as HTMLElement
        if(element.classList[0].indexOf("MuiCircularProgress-circle") == -1){
            return
        }
        setCustomCusorTimer(customCursortimer + 1)
    }

    const onMouseEnter = ()=>{
        // customCursor.current.style.translate = `${0}px ${0}px`
        if(customCursorShow == false){
            setCustomCusorShow(true)
        }
    }

    const onMouseLeave = () =>{
        setCustomCusorShow(false)
    }

    const onClick =()=>{
        if(customCursorAvoid){
            return
        }
        let newIndex = 0
        if(customCursorDirection == "left"){
            if(bannerShow <= 0){
                newIndex = bannerContent.length - 1
            }else{
                newIndex = bannerShow - 1
            }
        }else{
            if(bannerShow >= bannerContent.length - 1){
                newIndex = 0
            }else{
                newIndex = bannerShow + 1
            }
        }
        setCustomCusorTimer(0)
        setBannerShow(newIndex)
    }

    useEffect(()=>{
        bannerRef.current?.addEventListener("mousemove",onMousemove)
        return()=>{
            bannerRef.current?.removeEventListener("mousemove",onMousemove)
        }
    },[])

    useEffect(()=>{
        customCursor.current?.addEventListener("transitionend",onTransistionEnd)
        const cursorTimer = setInterval(
            cursorProgess
        ,bannerTimer*0.01)    
        return ()=>{
            customCursor.current?.removeEventListener("transitionend",onTransistionEnd)
            clearInterval(cursorTimer)
        }
    },[customCursortimer,customCursorShow])
    return(
        <Stack className="adBanner" ref={bannerRef} direction={"row"} justifyContent={"center"} position={"relative"}
            onMouseEnter = {onMouseEnter} onMouseLeave = {onMouseLeave} onClick={onClick}
            sx={{maxWidth:"1650px",height:{xs:"160px",sm:"200px",md:"300px",lg:"500px"},cursor:`${!customCursorAvoid?"none":""}`}}>
            {bannerContent.map((item,index)=>
                <Box key={index} component={"img"} display={bannerShow==index?"block":"none"} 
                    src={item.picture} sx={{width:"100%",objectFit:"cover",objectPosition:"center"}}>
                </Box>
            )}
            <Box ref={customCursor} className="customCursor"
                height={"50px"} width={"50px"} component={"button"} display={customCursorShow&&!customCursorAvoid?"block":"none"}
                sx={{position:"absolute",borderRadius:"25px",border:"none",top:0,left:0,pointerEvents:"none",
                }}>
                    <CircularProgress size={56} sx={{position:"absolute",top:"-3px",left:"-3px",transition:"none"}} 
                        variant="determinate" value={customCursortimer} />
                    {
                        customCursorDirection=="left"?<KeyboardArrowLeft sx={{position:"absolute",top:"15px",left:"15px"}}/>
                        :<KeyboardArrowRight sx={{position:"absolute",top:"15px",left:"15px"}}/>
                    }
            </Box>
                <Stack position={"absolute"} direction={"row"} alignItems={"center"} gap={"20px"} bottom={0}
                    onMouseEnter = {()=>setCustomCusorAvoid(true)} 
                    onMouseLeave = {()=>setCustomCusorAvoid(false)}
                >
                    {bannerContent.map((_item,index)=>
                        <Box className="bannerSelectButton" data-index={index} component={"button"} key={index}
                            sx={{width:`${bannerShow!=index?"10px":"50px"}`,
                            height:"10px",borderRadius:"25px",border:"none",padding:0,
                            transition: "width 0.5s ease-in-out",
                            opacity:`${bannerShow!=index?"0.5":"1"}`,
                            cursor:"pointer"
                        }} color="info" onClick={()=>{setBannerShow(index);setCustomCusorTimer(0)}}/>
                    )}
                </Stack>
        </Stack>
    )
}
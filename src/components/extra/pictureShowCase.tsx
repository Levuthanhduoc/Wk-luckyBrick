import { Box, IconButton, SxProps } from "@mui/material"

import CS from "../../assets/css/component.module.css"
import { MouseEvent, useRef, useState } from "react"
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material"

interface props{
    pictures:string[]
    sx?:SxProps
}

function PictureShowCase(props:props){
    const [page,setPage] = useState(0) 
    const [position,setPosistion] = useState(0)
    const [isMouseDown,setmouseDown] = useState(false)
    const [movePosistion,setMovePosistion] = useState(0)
    const dragableRef = useRef<HTMLElement>()
    const mouseCoord = useRef({
        startX:0,
        startY:0,
        scrollLeft: 0,
        scrollTop: 0
    })

    const selectedStyle = {
        border: " 3px solid black",
        borderRadius:"15px"  
    }

    const onclickLeft = ()=>{
        if(position <0){
            setPosistion(position + 100)
            setPage(page-1)
            if(dragableRef.current){
                dragableRef.current.children[page-1].scrollIntoView({ behavior: "smooth", block: "nearest" });
            }
        }
        
    }
    const onclickRight = ()=>{
        if(position > (props.pictures.length - 1)  * -100){
            setPosistion(position - 100)
            setPage(page+1)
            if(dragableRef.current){
                dragableRef.current.children[page+1].scrollIntoView({ behavior: "smooth", block: "nearest" });
            }
        }
    }

    const onSelectPicture = (index:number)=>{
        setPage(index)
        setPosistion(index*-100)
    }

    const onMouseDown = (e:MouseEvent)=>{
        if(!dragableRef.current) return
        const slider = dragableRef.current;
        const startX = e.pageX - slider.offsetLeft;
        const startY = e.pageY - slider.offsetTop;
        const scrollLeft = slider.scrollLeft;
        const scrollTop = slider.scrollTop;
        mouseCoord.current = { startX, startY, scrollLeft, scrollTop }
        setmouseDown(true)
    }
    const onMouseUp = ()=>{
        setmouseDown(false)
        setMovePosistion(0)
    }
    const onMouseMove = (e:MouseEvent)=>{
        if(!isMouseDown || !dragableRef.current){
            return
        }
        if(movePosistion == 0){
            setMovePosistion(e.pageY)
            return
        }
        e.preventDefault();
        const slider = dragableRef.current;
        const x = e.pageX - slider.offsetLeft;
        const y = e.pageY - slider.offsetTop;
        const walkX = (x - mouseCoord.current.startX) * 1.5;
        const walkY = (y - mouseCoord.current.startY) * 1.5;
        slider.scrollLeft = mouseCoord.current.scrollLeft - walkX;
        slider.scrollTop = mouseCoord.current.scrollTop - walkY;
        
    }
    
    return (
        <>
            <Box display={"flex"} flexDirection={{sx:"column",sm:"row"}} sx={props.sx||{height:"600px",width:"550px"}}>
                <Box ref={dragableRef} sx={{display:"flex",flex:1,backgroundColor: "rgba(38, 38, 38,0.5)", flexDirection:"column",width:"100%" ,overflowY:"scroll",scrollbarWidth:"none"}}
                    onMouseDown={(e)=>onMouseDown(e)} onMouseUp={onMouseUp} onMouseMove={(e)=>onMouseMove(e)} onMouseLeave={()=>{onMouseUp()}}
                >
                    {props.pictures.map((picture,index)=>{
                        return <Box key={index} sx={index == page?selectedStyle:{}} onClick={()=>onSelectPicture(index)}>
                            <img style={{userSelect:"none"}} draggable={false} className={CS.shopCardImage} src={picture}></img>
                        </Box>
                    })}
                </Box>
                <Box sx={{flex:3,position:"relative",overflow:"hidden",display:"flex",alignItems:"center",backgroundColor: "rgba(38, 38, 38,0.5)"}}>
                    <IconButton sx={{position:"absolute",left:0,zIndex:"1"}} onClick={()=>onclickLeft()}>
                        <KeyboardArrowLeft/>
                    </IconButton>
                    <Box sx={{display:"flex", flexDirection:"row",position:"absolute",transition:"1s ease-in-out",transform:`translateX(${position}%)`}}>
                        {props.pictures.map((picture,index)=>{
                                return <Box key={index} sx={{flexShrink:"0",width:"100%"}}>
                                    <img className={CS.shopCardImage} src={picture}></img>
                                </Box>
                            })}
                    </Box>
                    <IconButton sx={{position:"absolute",right:0,zIndex:"1"}} onClick={()=>onclickRight()}>
                        <KeyboardArrowRight/>
                    </IconButton>
                </Box>
            </Box>
        </>
    )
}

export default PictureShowCase
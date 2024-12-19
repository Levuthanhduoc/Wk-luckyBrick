import { ArrowBack, ArrowForward, KeyboardArrowLeft, KeyboardArrowRight, KeyboardDoubleArrowRightSharp } from "@mui/icons-material";
import { Box, IconButton, Stack, Typography } from "@mui/material";
import CS from '../../../assets/css/component.module.css'
import { memo, ReactElement, useEffect, useRef, useState } from "react";
import ProcessBar from "../../extra/processBar";
import fetchData from "../../../assets/module/fecthData";
import ShopBox from "../shop/shopCard";
interface itemData {
    id:number|string,
    name:string,
    price:number,
    image_uploaded_png:string,
    sale?:number,
    timesale?:string,
}
interface props{
    title:string,
    section?:string,
    item?:itemData[]
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

const apiUrl = import.meta.env.VITE_API_URL
export default memo(function ShowCaseBox(props:props){
    const [hoverNextButton,setHoverNextButtion] = useState(false)
    const [positionProp,setPositionProp] =useState({pos:0,click:0,maxClick:0})
    const [itemData,setItemData] = useState<itemData[]|null>(null)
    const pictureBoxRef = useRef<HTMLDivElement|null>(null)
    const pictureListRef = useRef<HTMLDivElement|null>(null)
    
    const calculatingClick = () =>{
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
        const numberToFillABox = (boxBound.width/(listBound.width*0.1))
        return Math.ceil(numberToFillABox * numberOfBox)
    }

    const moveShowcase = (pos:"left"|"right")=>{
        if(!itemData){
            return
        }
        let newPos = 0
        const oldMaxClick = positionProp.maxClick
        const updateMaxClick = calculatingClick()
        let updateClick = positionProp.click
        if(pos == "left"){
            newPos = positionProp.pos - 10
            updateClick = updateClick - 1
        }else if(pos == "right"){
            newPos = positionProp.pos + 10
            updateClick = updateClick + 1
        }
        if(oldMaxClick != updateMaxClick){
            const correction = oldMaxClick - updateMaxClick 
            updateClick = updateClick - correction
            newPos = 10*updateClick
        }
        if(updateClick > updateMaxClick){
            updateClick = updateMaxClick
            newPos = updateClick * 10
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
            isDisable:positionProp.click == 0},
        {
            icon:<KeyboardArrowRight/>,
            hoverIcon:<ArrowForward/>,
            onClick:()=>moveShowcase("right"),
            isDisable:(positionProp.click == positionProp.maxClick)&&(positionProp.maxClick != 0)
        }
    ]
    const getData = async ()=>{ 
        if(apiUrl){
            try {
                const result = await fetchData({url:apiUrl +`legos/info?name=legos&section=${props.section}`,
                    methoud:"get"})
                if(result){
                    const rowsData = (result as {[key:string]:unknown}).rows
                    setItemData(rowsData as itemData[])
                }
            } catch (error) {
                console.log(error)
            }
        }
    }
    useEffect(()=>{
        if(props.section){
            getData()
        }else if(props.item){
            setItemData(props.item)
        }
    },[])
    return(
        <>
        {itemData&&<Box margin={"80px 0 80px 0"} gap={"48px"} display={"flex"} flexDirection={"column"}>
            <Stack direction={{xs:"column",sm:"row"}} alignItems={{xs:"start",sm:"center"}} justifyContent={"space-between"}>
                <Typography component={"h2"} sx={{fontSize:"1.75rem",lineHeight:"1.1",fontWeight:"600"}}>{props.title}</Typography>
                <Stack direction={"row"} alignItems={"center"} 
                    sx={{transition:" 0.3s ease-in-out",cursor:"pointer"}}
                    onMouseEnter = {()=>setHoverNextButtion(true)} onMouseLeave={()=>setHoverNextButtion(false)}
                >
                    <Typography className={`${CS.underline} ${hoverNextButton?CS.underlineHover:""}`} 
                        sx={{position:"relative",fontSize:"16px"}}>
                            View All
                    </Typography>
                    <IconButton>{hoverNextButton?<KeyboardDoubleArrowRightSharp/>:<KeyboardArrowRight/>}</IconButton>
                </Stack>
            </Stack>
            <Box ref={pictureBoxRef} position={"relative"} height={"410px"} overflow={"hidden"}>
                <Stack ref={pictureListRef} direction={"row"} gap={"10px"} position={"absolute"} 
                    sx={{transform:`translate(${-positionProp.pos}%)`,transition:"transform 0.3s ease-in-out",left:0}}
                >
                    {itemData&&itemData.map((item)=>
                        <ShopBox
                            key={item.id}
                            sx={{width:"300px"}} 
                            id={`${item.id}`}  
                            name={item.name} 
                            price={item.price} 
                            picture={apiUrl+"storage/"+item.image_uploaded_png[0]} 
                            sale={(item.sale||1 )* 100} 
                            timer={item.timesale}
                        />
                    )}
                </Stack>
            </Box>
            <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"} 
                spacing={"50px"}
            > 
                <ProcessBar fill={positionProp.maxClick != 0?((positionProp.click/positionProp.maxClick)*100):0} 
                    color="none" colorImage=" linear-gradient(136deg, rgb(0, 0, 0) 0%, rgb(0, 76, 153) 50%, rgb(0, 123, 255) 100%)"
                    backgroundColor="#424242"
                    size="2px"/>
                <Stack direction={"row"} gap={"10px"}>
                    {directionButtons.map((item,index)=>
                        <DirectionButton 
                            key={index} 
                            icon={item.icon} 
                            hoverIcon={item.hoverIcon}
                            onClick={item.onClick}
                            disable={item.isDisable}
                        />
                    )}
                </Stack>
            </Stack>
        </Box>}
        </>
    )
})
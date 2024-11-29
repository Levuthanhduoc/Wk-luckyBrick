import { Box, SxProps, Typography} from "@mui/material"
import CS from '../../assets/css/component.module.css'
import { t } from "i18next"
import isEven from "../../assets/module/isEven"
import {useState } from "react"

interface items{
    name:string,
    icon:any,
    onClick:Function
}

interface props{
    end?:boolean,
    start?:boolean,
    sx?:SxProps,
    items:items[],
    color?:string[]
}

const padding = (item:items[])=>{
    let newArr = [...item]
    const baseItem = {name:"",icon:"",onClick:()=>{}}
    newArr.push(baseItem)
    newArr.unshift(baseItem)
    return newArr
}

const CutBox = (props:any)=>{
    const [hover,setHover] = useState(false)
    return(
        <Box className = {CS.cutBox} sx={props.css}  
            onMouseOver={()=>{props.hover?setHover(true):""}} 
            onMouseOut={()=>{props.hover?setHover(false):""}} >
            {hover&&<>
                <Box sx={{position:"absolute",top:0,left:0,width:"100%",height:"100%",backgroundColor:"rgba(0,0,0,0.5)"}}></Box>
            </>}
            {props.block&&<Box sx={{position:"absolute",right:"-10px",top:"25%",width:"20px",height:"50%",backgroundColor:"inherit",zIndex:1}}>
                {hover&&<Box sx={{position:"absolute",top:0,left:0,width:"100%",height:"100%",backgroundColor:"rgba(0,0,0,0.5)"}}></Box>}    
            </Box>}
            {props.icon}
            <Typography fontSize={"10px"}>
                {t(props.item)}
            </Typography>
            {props.children}
        </Box>
)
}


function cutBar (props:props){
    const sx = props.sx?props.sx:{}
    const color = props.color?props.color:["#007BFF","#0056B3"]
    const items = padding(props.items)
    return(
        <>  
            <Box sx={{...sx,display:"flex",justifyItems:"center"}}>
                {items.map((item,index)=>{
                    let cssBox =  {background:`${color[isEven(index)]}`,height:"100%",position:"relative",padding:" 0 20px 0 20px 0",display:"grid",placeItems:"center",cursor:"pointer"} as any
                    let block = true
                    let hover = false
                    if(index == 0){
                        cssBox = {...cssBox,width:{xs:"10px",md:"40px"},borderRadius:"5px 0 0 5px",padding:"0"}
                    }else if(index == items.length-1){
                        cssBox = {...cssBox,width:{xs:"20px",md:"50px"},borderRadius:"0 5px 5px 0",padding:"0"}
                        block = false
                    }else{
                        hover = true
                        cssBox = {...cssBox,flex:1,display:"grid"}
                    }
                    return<CutBox key={index} css = {cssBox} block={block} item = {item.name} hover={hover} icon={item.icon}/>
                    })}
            </Box>
        </>
    )
}

export default cutBar
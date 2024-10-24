import { Box, SpeedDial, SpeedDialAction, SpeedDialIcon } from "@mui/material"
import CS from '../../assets/css/component.module.css'
import { t } from "i18next"
import isEven from "../../assets/module/isEven"
import { useRef, useState } from "react"
import SearchBar from "./searchBar"
import { Search } from "@mui/icons-material"

interface items{
    name:string,
    icon:any,
    onClick:Function
}

interface props{
    end?:boolean,
    start?:boolean,
    sx?:Object,
    items:items[],
    color?:string[]
    searchData?:any[]
    setSearchData?:Function
    onSearch?:Function 
}

const padding = (item:items[])=>{
    let newArr = [...item]
    const baseItem = {name:"",icon:"",onClick:()=>{}}
    newArr.push({...baseItem,icon:<Search/>,onClick:(element:Element)=>element.scrollIntoView({ behavior: 'smooth',block: 'center' })})
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
            {props.block&&<Box sx={{position:"absolute",right:"-10px",top:"25%",width:"30px",height:"50%",backgroundColor:"inherit",zIndex:1}}>
                {hover&&<Box sx={{position:"absolute",top:0,left:0,width:"100%",height:"100%",backgroundColor:"rgba(0,0,0,0.5)"}}></Box>}    
            </Box>}
            {t(props.item)}
            {props.children}
        </Box>
)
}


function cutBar (props:props){
    const sx = props.sx?props.sx:{}
    const color = props.color?props.color:["#007BFF","#0056B3"]
    const items = padding(props.items)
    const searchRef = useRef()
    return(
        <>  
            <Box sx={{...sx,display:"flex",justifyItems:"center",position:"relative"}}>
                {items.map((item,index)=>{
                    let cssBox =  {background:`${color[isEven(index)]}`,height:"100%",position:"relative",padding:" 0 30px 0 30px 0",display:"grid",placeItems:"center",cursor:"pointer"} as any
                    let block = true
                    let hover = false
                    let search = false
                    if(index == 0){
                        cssBox = {...cssBox,width:"40px",borderRadius:"5px 0 0 5px",padding:"0"}
                    }else if(index == items.length-1){
                        cssBox = {...cssBox,width:"50px",borderRadius:"0 5px 5px 0",padding:"0"}
                        block = false
                    }else if(index == items.length-2){
                        search= true
                        cssBox = {...cssBox,flex:1,display:"flex"}
                    }
                    else{
                        hover = true
                        cssBox = {...cssBox,flex:1,display:{xs:"none",md:"grid"}}
                    }
                    return<CutBox key={index} css = {cssBox} block={block} item = {item.name} hover={hover}>
                        {search&&props.onSearch&&<SearchBar ref={searchRef} sx={{flex:1,margin:"0 15px 0 15px"}} onSearch={props.onSearch} />}
                    </CutBox>   
                    })}
            </Box>
            <Box sx={{display:{xs:"block", md:"none"},position:"fixed",zIndex:1000, bottom:"5%", left:"20%", height: 320, transform: 'translateZ(0px)', flexGrow: 1 }}>
                <SpeedDial
                    ariaLabel="SpeedDial basic example"
                    sx={{ position: 'absolute', bottom: 16, right: 16 }}
                    icon={<SpeedDialIcon/>}
                >
                    {items.map((action) => {
                        if(action.icon!=""){
                            return<SpeedDialAction
                                key={action.name}
                                icon={action.icon}
                                tooltipTitle={action.name}
                                onClick={()=>{action.onClick(searchRef.current)}}
                            />

                        }
                    })}
                </SpeedDial>
            </Box>
        </>
    )
}

export default cutBar
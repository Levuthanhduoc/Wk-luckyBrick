import { Box, Stack, Typography } from "@mui/material"
import ItemTag from "./tag"
import { useNavigate } from "react-router-dom"
import {useRef} from "react"
import CS from "../../../src/assets/css/component.module.css"
import isSale from "../../assets/module/isSale"

interface props{
    [key:string]:string
}

const apiUrl = import.meta.env.VITE_API_URL

export default function PreviewCard(props:props){
    const linkPath = useRef("")
    const navigate = useNavigate()

    const NameAndTag = ()=>{
        let tableName = ""
        let itemCatalog = ""
        if(props.name && props.price){
            tableName = "Lego"
            itemCatalog = "shop"
        }else if(props.gametitle){
            tableName = "Game"
            itemCatalog = "game"
        }else{
            tableName = "Tutorial"
            itemCatalog = "tutorial"
        }
        linkPath.current = `${itemCatalog}/${props.id}`
        return (
            <>  
                <ItemTag text={tableName}/>
                <Typography  fontSize={"15px"} paddingLeft={"5px"}>{props.name?props.name:props.gametitle}</Typography>
            </>
        )
    }

    return(
        <Box className={CS.click} onClick={()=>navigate(linkPath.current)}>
            <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"} flexGrow={0}>
                <Box sx={{width:{xs:"200px",md:"300px"}}}>
                    <Typography component={'span'} variant={'body2'} margin={"0 0 10px 0"}
                        sx={{wordWrap:"break-word",overflowWrap:"break-word",whiteSpace:"normal"}}
                    >
                        <NameAndTag/> 
                    </Typography>
                    {props.price&&<Box display={"flex"} flexDirection={"row"} alignItems={"center"} gap={"15px"} sx={{fontSize: "15px",lineHeight: "15px"}}>
                        <Typography sx={{color:"#B22222"}} >
                            ${Number(props.price) - (Number(props.price)*Number(props.sale))}
                        </Typography>
                        {isSale(props.timesale)&&<Typography sx={{textDecoration:"line-through",color: "rgba(211, 211, 211, 0.55)"}}>${props.price}</Typography>}
                    </Box>}
                </Box>
                <Box sx={{height:"50px"}} border={"1px solid rgba(255, 255, 255, 0.23)"} borderRadius={"4px"}>
                    <img style={{height:"100%",objectFit:"contain"}} src={apiUrl +"storage/"+ props.image_uploaded_png[0]}></img>
                </Box>
            </Stack>
        </Box>
    )
}
import { Box, IconButton, Typography } from "@mui/material"
import Breakcrumb from "../../extra/breadcrumb"
import { useEffect, useRef, useState } from "react"
import { Fullscreen, FullscreenExit } from "@mui/icons-material"
import fetchData from "../../../assets/module/fecthData"
import { useParams } from "react-router-dom"
import { JSONContent } from "@tiptap/core"
import { getHtml } from "../../extra/richTextForm"
import Parser from 'html-react-parser';

const centerCss = {
    maxWidth:"1540px",width:"100%",margin:"auto",
    padding:{xs:"25px 0 0 0",sm:"45px 15px 70px 15px",md:"45px 30px 70px 30px",lg:"45px 50px 70px 50px"}, 
}
interface defaultData{
    gametitle:string,
    image_uploaded_png:string,
    id:number,
    gamefile_uploaded_zip:string,
    description:JSONContent
}
const apiUrl = import.meta.env.VITE_API_URL

function GameDetail(){
    const [isFullscreen,setFullscreen] = useState(false)
    const [itemdata,setItemData] = useState<defaultData>()
    const {id}= useParams()
    const embedRef = useRef<HTMLElement>(null)

    const getData = async ()=>{ 
        if(apiUrl){
            try{
                const result = await fetchData({url:apiUrl +`legos/info?name=games&id=${id}`,
                    methoud:"get"})
                if(result){
                    const rowsData = (result as {[key:string]:unknown[]}).rows
                    setItemData(rowsData[0] as defaultData)
                    console.log(rowsData)
                }
            }catch(error){
                console.log(error)
            }
        }
    }
    useEffect(()=>{
        getData()
    },[])

    return(
        <>
            <Box sx={centerCss}>
                <Breakcrumb sx={{width:"100%",margin:"auto",padding:"30px 0 30px 0"}}/>
                {itemdata&&<Box ref={embedRef} sx={isFullscreen?{position:"fixed",top:"0",left:"0",zIndex:"1200",width:"100%",height:"100%"}:{width:"100%",height:"500px"}}
                    onClick={(e)=>e.stopPropagation()}
                >
                    <Box sx={{position:"relative",width:"100%",height:"100%"}}>
                        <iframe src={apiUrl+"storage/" + itemdata.gamefile_uploaded_zip +"/index.html"} width={"100%"} height={"100%"}></iframe> 
                        <IconButton sx={{position:"absolute",top:0,left:0}} onClick={()=>isFullscreen?setFullscreen(false):setFullscreen(true)}>
                            {isFullscreen?<FullscreenExit/>:<Fullscreen/>}
                        </IconButton>
                    </Box>
                </Box>}

                <Box>
                    <Typography>Description</Typography>
                    {itemdata?.description?Parser(getHtml(itemdata.description)):""}
                </Box>
            </Box>
        </>
    )
}

export default GameDetail
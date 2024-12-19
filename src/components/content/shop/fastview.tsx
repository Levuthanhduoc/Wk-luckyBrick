import { Backdrop, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import PictureShowCase from "../../extra/pictureShowCase";
import fetchData from "../../../assets/module/fecthData";
import { JSONContent } from "@tiptap/core";

interface props{
    itemId:string
    open:boolean,
    onClose:()=>void
}
interface itemsData  {
    id:number,
    name:string,
    image_uploaded_png: string[] ,
    price:number,
    sale:number,
    description:JSONContent|undefined,
    age:string,
    pieces:string,
    serial:string,
    category:string,
    timesale:string
}
const apiUrl = import.meta.env.VITE_API_URL
export default function FastView(props:props){
    const [picture,setPicture] = useState<string[]>()
    const getData = async ()=>{ 
        if(apiUrl && props.itemId){
            try {
                const result = await fetchData({url:apiUrl +`legos/info?name=legos&id=${props.itemId}`,
                    methoud:"get"})
                if(result){
                    const rowsData = (result as {[key:string]:itemsData[]}).rows
                    setPicture(rowsData[0].image_uploaded_png)
                }
            } catch (error) {
                console.log(error)
            }
        }
    }
    useEffect(()=>{
        if(props.open){
            getData()
        }
    },[props.open])
    return(
        <Backdrop
            sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
            open={props.open}
            onClick={props.onClose}
        >
            {
                !picture?<CircularProgress color="inherit"/>:
                <PictureShowCase simple={true} 
                    sx={{width:{xs:"100%",lg:"1000px"},height:"500px",gap:"5px",backdropFilter:"blur(10px)"}} 
                    pictures={picture.map((img)=>apiUrl +"storage/"+ img)}
                    onClick={(e)=>e.stopPropagation()}    
                />
            }
        </Backdrop>
    )
} 
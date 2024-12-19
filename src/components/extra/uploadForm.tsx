import { Button, FormControl, FormLabel, ImageList, ImageListItem, Stack, SxProps, Typography,} from "@mui/material"
import upperCaseFirstLetter from "../../assets/module/upperCaseFirstletter"
import { CloudUpload } from "@mui/icons-material";
import { ChangeEventHandler, useEffect, useState } from "react";

interface propsType{
    sx?:SxProps,
    name:string,
    type:string,
    value?:string[],
}
const spectification:{[key:string]:string} = {
    "png":"image/jpeg, image/png, image/webp",
    "pdf":"application/pdf",
    "zip":"application/zip",
    "json":"application/JSON",
}

const apiUrl = import.meta.env.VITE_API_URL

export default function UploadForm (props:propsType){
    const [showImage,setShowImage] =useState<string[]>([])
    const [namePreview,setNamePreview] = useState<string[]|undefined>()

    const setimage:ChangeEventHandler<HTMLInputElement> = (event)=>{
        if(event.target){
            const img = Array.from(event.target.files||[])
            if (img.length > 0) {
                if(props.type == "png"){
                    const imgSrc  = img.map((item)=>URL.createObjectURL(item as Blob))
                    setShowImage(imgSrc)
                }else{
                    const uploadPreview = img.map((item)=>item.name)
                    setNamePreview(uploadPreview)
                }
            }
        }
    }
    const ArrayToString = (arr?:string[])=>{
        if(arr){
            return arr.reduce((total,current)=>total +"&&&"+ current)
        }
        return undefined
    }
    useEffect(()=>{
        if(props.value){
            if(props.type == "png"){
                const imgSrc = props.value.map((item)=>apiUrl + "storage/" + item)
                setShowImage(imgSrc)
            }else{
                const fileNames = props.value.map((fileName)=>{
                    const extracName = fileName.split("/")
                    return extracName[extracName.length -1]
                })
                setNamePreview(fileNames)
            }
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    return(
        <>
        <FormControl>
              <FormLabel htmlFor={props.name}>{upperCaseFirstLetter(props.name)}</FormLabel>
              <input style={{display:"none"}} value={ArrayToString(props.value as string[])||""} type="text" id={props.name + "_old"} onChange={setimage} name={props.name+"_old"}></input>
              <Button
                id={props.name}
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUpload />}
                >
                Upload files
                <input style={{display:"none"}} type="file" id={props.name} 
                    onChange={setimage} name={props.name} multiple
                    accept={spectification[props.type]}
                ></input>
                </Button>
                <ImageList sx={{ width: "100%", maxHeight: 450 }} cols={3} rowHeight={164}>
                {showImage.map((item,index) => (
                    <ImageListItem key={index}>
                    <img
                        srcSet={`${item}`}
                        src={`${item}`}
                        loading="lazy"
                    />
                    </ImageListItem>
                ))}
                </ImageList>
                <Stack>
                    {namePreview?namePreview.map((name,index)=><Typography key={index}>{name}</Typography>):""}
                </Stack>
            </FormControl>
        </>
    )
}
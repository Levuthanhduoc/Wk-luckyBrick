import { Button, FormControl, FormLabel, ImageList, ImageListItem, styled, SxProps} from "@mui/material"
import upperCaseFirstLetter from "../../assets/module/upperCaseFirstletter"
import { CloudUpload } from "@mui/icons-material";
import { useState } from "react";

interface propsType{
    sx?:SxProps,
    name:string,
    value?:string,
}
export default function UploadForm (props:propsType){
    const [showImage,setShowImage] =useState<string[]>([])
    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
    });

    const setimage = (e)=>{
        const img = Array.from(e.target.files)
        if (img.length > 0) {
            const imgSrc  = img.map((item)=>URL.createObjectURL(item as Blob))
            setShowImage(imgSrc)
        }
    }
      

    return(
        <>
        {console.log(showImage)}
        <FormControl>
              <FormLabel htmlFor={props.name}>{upperCaseFirstLetter(props.name)}</FormLabel>
              <Button
                id={props.name}
                component="label"
                role={undefined}
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUpload />}
                >
                Upload files
                <VisuallyHiddenInput
                    type="file"
                    onChange={setimage}
                    multiple
                />
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
            </FormControl>
        </>
    )
}
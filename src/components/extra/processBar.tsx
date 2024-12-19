import { Box, SxProps } from "@mui/material"

interface props{
    sx?:SxProps,
    fill:number,
    color?:string,
    size?:string,
    backgroundColor?:string,
    colorImage?:string
}

function ProcessBar(props:props){
    return(
        <>
            <Box sx={{
                backgroundColor:`${props.backgroundColor||"rgb(224, 224, 224)"}`,
                position:"relative",width: "100%",height: `${props.size||"1.25rem"}`,
                borderRadius: "0.99rem",
                overflow: "hidden",margin: "0.75rem",
                ...props.sx}}>
                <Box sx={{
                    backgroundColor:`${props.color||"rgb(255, 213, 2)"}`,
                    backgroundImage:`${props.colorImage||""}`,
                    height:"100%",width:`${props.fill}%`}}>

                </Box>
            </Box>
        </>
    )
}

export default ProcessBar
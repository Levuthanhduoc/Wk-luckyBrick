import { Box, SxProps } from "@mui/material"

interface props{
    sx?:SxProps,
    fill:number
}

function ProcessBar(props:props){
    return(
        <>
            <Box sx={{
                backgroundColor:"rgb(224, 224, 224)",
                position:"relative",width: "100%",height: "1.25rem",
                borderRadius: "0.99rem",
                overflow: "hidden",margin: "0.75rem",
                ...props.sx}}>
                <Box sx={{backgroundColor:"rgb(255, 213, 2)",height:"100%",width:`${props.fill}%`}}>

                </Box>
            </Box>
        </>
    )
}

export default ProcessBar
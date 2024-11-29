import { Box, Stack, Typography } from "@mui/material";

interface props{
    text:string,
}

export default function ItemTag(props:props){
    return(
            <div style={{float:"left"}}>
                <Stack height={"20px"} direction={"row"}>
                    <Box sx={{
                        maxWidth:"50px",
                        backgroundColor:"#0A47A9",
                        padding:"0 2px 0 2px",
                        borderRadius:"5px 0 0 5px",
                    }} display={'flex'} justifyContent={"center"} alignItems={"center"}>
                        <Typography color="textPrimary" fontWeight={"600"} fontSize={"10px"}>
                        {props.text}
                        </Typography>
                    </Box>
                    <Box sx={{
                        width: 0,
                        height: 0,
                        borderTop: "10px solid transparent",
                        borderBottom: "10px solid transparent",
                        borderLeft: "8px solid #0A47A9",}}
                    />
                </Stack>
            </div>
    )
}
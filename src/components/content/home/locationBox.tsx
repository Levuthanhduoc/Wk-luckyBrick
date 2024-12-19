import { Box, Button, Stack, Typography } from "@mui/material";
import store from '../../../assets/video/3266322-hd_1920_1080_30fps.mp4'
export default function LocationBox(){
    return(
            <Box sx={{backgroundColor:"transparent",borderRadius:"5px"}} marginTop={"72px"} position={"relative"}
                overflow={"hidden"}
            >
                <Box component={"video"} autoPlay muted loop width={"100%"}>
                    <Box component={"source"} src={store}/>                  
                </Box>
                <Stack direction={"column"} justifyContent={"center"} alignItems={"center"} position={"absolute"} 
                    top={0} left={0} width={"100%"} height={"100%"}
                >   
                    <Stack direction={"column"} justifyContent={"center"} alignItems={"center"}
                        sx={{backdropFilter:"blur(8px)", borderRadius:"15px",padding:"20px"}} gap={"20px"}
                    >
                        <Box maxWidth={"100px"}>
                            {/* <Box component={"img"} src={opengif} sx={{objectFit:"contain",objectPosition:"center",width:"100%"}}/> */}
                        </Box>
                        <Box textAlign={"center"}>
                            <Typography fontSize={"24px"} fontWeight={"bolder"}>Visit Us</Typography>
                            <Typography textAlign={"center"}>Brick Haven LEGO Store 42 Brickworks Avenue Blockington, BL 12345 United States</Typography>
                        </Box>
                        <Box textAlign={"center"}>
                            <Typography fontSize={"24px"} fontWeight={"bolder"}>Opening Time:</Typography>
                            <Typography>Monday - Friday: 10:00 AM - 9:00 PM</Typography>
                            <Typography>Saturday: 9:00 AM - 9:00 PM</Typography>
                            <Typography>Sunday: 11:00 AM - 4:00 PM</Typography>
                        </Box>
                        <Button variant="contained" sx={{backgroundColor:"rgb(240,91,81)",fontWeight:"600"}}>Direction</Button>
                    </Stack>
                </Stack>
            </Box>
    )
}
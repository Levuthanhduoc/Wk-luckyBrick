import { Box, Slide } from "@mui/material";
import SignIn from "../../sign-in/SignIn";

function Home(){
    return (
        <>
            <Slide direction="left" in={true} timeout={500}>
                <Box>
                    <Box className="ad-banner">
                        
                    </Box>
                
                </Box>
            </Slide>
        </>
    )
}

export default Home
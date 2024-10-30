import { Box, Slide } from "@mui/material";

function Home(){
    return (
        <>
            <Slide direction="left" in={true} timeout={500}>
                <Box>
                    <Box className="ad-banner">
                        home
                    </Box>
                
                </Box>
            </Slide>
        </>
    )
}

export default Home
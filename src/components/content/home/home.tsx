import { Box, Slide } from "@mui/material";
import React from "react";

const ShopCard = React.lazy(()=>import('../../extra/shopCard'))



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
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
                    <iframe style={{width:"1000px",height:"1000px"}} src={"../../../assets/game/bird/index.html"} title="Embedded HTML"></iframe>
                </Box>
            </Slide>
        </>
    )
}

export default Home
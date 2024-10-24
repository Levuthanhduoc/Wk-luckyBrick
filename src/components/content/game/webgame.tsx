import { Box, Typography } from "@mui/material";
import GameCard from "./gameCard";

function WebGame(){
    const centerCss = {
        maxWidth:"1540px",width:"100%",margin:"auto",
        padding:{sm:"45px 15px 70px 15px",md:"45px 30px 70px 30px",lg:"45px 50px 70px 50px"}, 
    }
    return (
        <>
            <Box>
                <Box sx={{
                    backgroundImage:"radial-gradient(circle, rgba(0, 51, 160, 0.3), rgba(0, 31, 63, 0.3))",
                    display:"flex",flexDirection:"column",
                    justifyContent:"center",alignItems:"center",
                    height:"200px",
                }}>
                        <Typography sx={{
                            textAlign:"center",
                            fontSize:"2em",
                            fontWeight:"bolder"
                        }}>
                            {""}  
                        </Typography>
                        <Typography sx={{fontSize:"0.9em"}}>here </Typography>
                </Box>
                <Box sx={centerCss}>
                    <GameCard/>
                </Box>
            </Box>
        </>
    )
}

export default WebGame
import { Box, Grid2, Pagination, Typography } from "@mui/material";
import GameCard from "./gameCard";
import placeHolder3 from '../../../assets/image/placeholder/placeHolder3.jpg'
import { useState } from "react";

function WebGame(){
    const [page,setPage] = useState(1)
    const centerCss = {
        maxWidth:"1540px",width:"100%",margin:"auto",
        padding:{sm:"45px 15px 70px 15px",md:"45px 30px 70px 30px",lg:"45px 50px 70px 50px"}, 
    }

    const data = [{
        name:"testGame",
        picture:placeHolder3,
    }]
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
                    <Grid2 container spacing={2} columns={{sm:2,md:2,lg:3,xl:4}}>
                        {data.map((item,index)=>{
                            if(index >= (page-1)*12&&index<page*12){
                                return<Grid2 key={item.name} size={1}>
                                        <GameCard sx={{minWidth:"200px",maxWidth:"500px",height:"auto"}} name={item.name} picture={item.picture}/>
                                    </Grid2>
                                }
                            }
                        )}
                    </Grid2>
                    <Box sx={{display:"flex",justifyContent:"center"}}>
                        <Pagination count={Math.ceil(data.length/12)} page={page} onChange={(_e,value)=>setPage(value)} shape="rounded" />
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default WebGame
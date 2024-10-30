import { Box} from "@mui/material";
import { Suspense } from "react";
import {Route, Routes } from "react-router-dom";
import SkeletonExtra from "../extra/seletonEX";

import allPath from "../../_nav";
function BaseContent (){
    return(
        <>
            <Box className ="app-content" component="main" >
                <Box sx={{padding:{xs:"5px" ,sm:"40px",md:"50px"}}}>
                    <Suspense fallback={<SkeletonExtra/>}>
                        <Routes>
                            {allPath.map((item)=>{
                                return (
                                    <Route key={item.alt} path={item.path} element={item.element}/>
                                )
                            })}
                        </Routes>                
                    </Suspense>                
                </Box>
            </Box>        
        </>
    )
}

export default BaseContent
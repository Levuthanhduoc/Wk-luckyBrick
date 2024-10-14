import { Box, Skeleton, Toolbar } from "@mui/material";
import { Suspense } from "react";
import {Route, Routes } from "react-router-dom";

import allPath from "../../_nav";
function BaseContent (){
    return(
        <>
            <Box className ="app-content" component="main" sx={{ p: 3 }}>
                <Toolbar />
                    <Suspense fallback={<Skeleton variant="rectangular" width={210} height={118} />}>
                        <Routes>
                            {allPath.map((item)=>{
                                return (
                                    <Route key={item.alt} path={item.path} element={item.element}/>
                                )
                            })}
                        </Routes>                
                    </Suspense>                
            </Box>        
        </>
    )
}

export default BaseContent
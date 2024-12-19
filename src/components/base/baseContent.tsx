import { Box} from "@mui/material";
import { Suspense, useContext } from "react";
import {Route, Routes } from "react-router-dom";
import SkeletonExtra from "../extra/seletonEX";

import allPath from "../../_nav";
import FastView from "../content/shop/fastview";
import { Context } from "./ContextWarper";
import { contextInterface } from "../../AppTyscript";
function BaseContent (){
    const {fastviewOpen,setFastViewOpen} = useContext(Context) as contextInterface
    return(
        <>
            <Box className ="app-content" component="main" >
                <Box sx={{padding:{xs:"0px 5px 5px 5px",md:"50px"}}}>
                    <Suspense fallback={<SkeletonExtra/>}>
                        <Routes>
                            {allPath.map((item)=>{
                                return (
                                    <Route key={item.alt} path={item.path} element={item.element}/>
                                )
                            })}
                        </Routes>                
                    </Suspense>
                    <FastView itemId={fastviewOpen.itemId as string} open={fastviewOpen.isOpen} onClose={()=>setFastViewOpen({isOpen:false})}/>                  
                </Box>
            </Box>        
        </>
    )
}

export default BaseContent
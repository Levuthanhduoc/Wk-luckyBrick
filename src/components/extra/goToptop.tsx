import { KeyboardDoubleArrowUp } from "@mui/icons-material"
import { IconButton } from "@mui/material"
import { useEffect, useState } from "react"

function GoTop(){
    const [show,setShow] = useState(false)
    const onScoll=()=>{
        const posNow = window.scrollY
        if(posNow > 300){
            setShow(true)
        }else{
            setShow(false)
        }
    }

    useEffect(()=>{
        window.addEventListener("scroll",onScoll)
    },[])
    return(
        <>
            {show&&<IconButton sx={{position:"fixed",zIndex:1000,bottom:"70px",right:"10px",background: " #0056B3"}} onClick={()=>window.scrollTo({top:0,behavior:"smooth"})}>
                <KeyboardDoubleArrowUp/>
            </IconButton>}
        </>
    )
}

export default GoTop
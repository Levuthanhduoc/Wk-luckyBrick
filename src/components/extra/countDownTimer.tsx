import { Typography } from "@mui/material"
import { useEffect, useState } from "react"

interface props{
    timer:string
}

function CountDown(props:props){
    const [countDown,setCountDown] = useState<string|number|undefined>("start")

    const calCountDown = (time:string|number)=>{
        const endTime = new Date(time).getTime()
        const currentTime = new Date().getTime()
        const timeDiff = endTime - currentTime 
        const day = Math.floor(timeDiff / (24*60*60*1000))
        const hour = Math.floor(((timeDiff) % (24*60*60*1000))/(60*60*1000))
        const min = Math.floor(((timeDiff) % (60*60*1000))/(60*1000))
        const sec = Math.floor(((timeDiff) % (60*1000))/(1000))
        const result = `${day}d : ${hour}h : ${min}m:${sec}s`
        if(timeDiff > 0){
            setCountDown((result as unknown) as string)
        }else{
            setCountDown(undefined)
        }
    }

    useEffect(()=>{
        const timerSale = setInterval(()=>{
            if(countDown && props.timer){
                calCountDown(props.timer)
            }else{
                clearInterval(timerSale)
            }
        },1000)
        return ()=>{
            clearInterval(timerSale)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return(
        <>
            <Typography sx={{color:"#B22222",textAlign:"center"}}>
                {countDown||"END"}
            </Typography>
        </>
    )
}

export default CountDown
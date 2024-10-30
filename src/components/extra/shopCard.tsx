import { Box,IconButton,Slide,Typography } from "@mui/material";
import { useEffect, useState } from "react";

import CS from '../../assets/css/component.module.css'
import { FavoriteBorderOutlined, RemoveRedEyeOutlined, ShoppingBagOutlined} from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import moneyConvert from "../../assets/module/moneyConvert";
import { useNavigate } from "react-router-dom";

type componentProps = {
    id:string,
    name:string,
    price:number,
    picture:string,
    sale?:number|undefined,
    timer?:string|number|undefined,
    sx?:object,
}
function ShopBox(props:componentProps){
    const {t,i18n}= useTranslation()
    const [hover,setHover] = useState(false)
    const [hoverImage,setHoverImage] = useState(false)
    const [countDown,setCountDown] = useState<string|number|undefined>("start")
    const navigation = useNavigate()

    const buttonCard = [
        {name:"add to cart",icon:<ShoppingBagOutlined/>,time:600},
        {name:"favorite",icon:<FavoriteBorderOutlined/>,time:700},
        {name:"show more",icon:<RemoveRedEyeOutlined/>,time:800}
    ]

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
            if(countDown && props.timer && !hoverImage){
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

    return (
        <> 
            <Box className = {`${CS.shopCard}`} sx={props.sx?props.sx:{width:"360px"}} 
                onMouseOver={()=>{setHover(true);setHoverImage(true)}} 
                onMouseOut={()=>{setHover(false);setHoverImage(false)}}>
                <Box className = {`${CS.borderGaming} ${hover&&CS.borderGamingHover}`}></Box>
                <Box className={`${CS.shopCardContent}`}>
                    <Box sx={{display:"flex",gap:"5px"}} 
                    >
                        <span className={CS.dot}/>
                        <span className={CS.dot}/>
                        <span className={CS.dot}/>
                    </Box>
                    <Box sx={{display:"flex",justifyContent:"center",backgroundColor:"#262626",borderRadius:"5px",position:"relative"}}>
                        <img onClick={()=>{navigation(props.id)}} className={CS.shopCardImage} src={props.picture}/>
                        <Box sx={{
                            position:"absolute",
                            overflow:"hidden",
                            width:"100%",height:"15%",
                            bottom:"0" ,
                            display:"flex",flexDirection:"column",alignItems:"center"
                        }}>    
                            <Box>
                                {buttonCard.map((item)=>{ 
                                    return(                        
                                        <Slide key={item.name} direction="up" in={hoverImage} timeout={item.time} mountOnEnter unmountOnExit>
                                            <IconButton>{item.icon}</IconButton>
                                        </Slide>
                                    )
                                })}                                                      
                            </Box>
                        </Box>
                        <Box sx={{position:"absolute",bottom:"0",overflow:"hidden", width:"100%",}}>
                            {(countDown && countDown !="start")&&<Slide direction="up" in={!hoverImage} timeout={500} mountOnEnter unmountOnExit>
                                    <Typography sx={{color:"#B22222",backgroundColor:"rgba(0,0,0,0.4)",textAlign:"center"}}>
                                        {countDown}
                                    </Typography>
                            </Slide>}
                        </Box>
                        {(props.sale&&countDown)&&<Box sx={{position:"absolute",top:"10px",right:"10px"}} className={CS.salePill}>
                            {`- ${props.sale}%`}
                        </Box>}
                    </Box>
                    <Box>
                        <Typography>{props.name}</Typography>
                        <Typography sx={{fontWeight:"bolder"}}>{t("conversion.money",{value:moneyConvert(props.price,i18n.language)})}</Typography>
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default ShopBox
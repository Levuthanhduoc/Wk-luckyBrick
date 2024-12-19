import { Box,IconButton,Slide,Stack,SxProps,Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";

import CS from '../../../assets/css/component.module.css'
import { FavoriteBorderOutlined, RemoveRedEyeOutlined, ShoppingBagOutlined} from "@mui/icons-material";
import { useTranslation } from "react-i18next";
import moneyConvert from "../../../assets/module/moneyConvert";
import { useNavigate } from "react-router-dom";
import { Context } from "../../base/ContextWarper";
import { contextInterface } from "../../../AppTyscript";
import AddToCart from "../../../assets/module/addtoCart";
import isSale from "../../../assets/module/isSale";

type componentProps = {
    id:string,
    name:string,
    price:number,
    picture:string,
    sale?:number|undefined,
    timer?:string|number|undefined,
    sx?:SxProps,
}
function ShopBox(props:componentProps){
    const {t,i18n}= useTranslation()
    const [hover,setHover] = useState(false)
    const [hoverImage,setHoverImage] = useState(false)
    const [countDown,setCountDown] = useState<string|number|undefined>("start")
    const [mobile,setMobile] = useState(false)
    const contextItem = useContext(Context) as contextInterface
    const navigation = useNavigate()
    const isCurrentSale = isSale(`${props.timer}`)

    
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

    const onChangeSize = ()=>{
        const widthNow = window.innerWidth
        if(widthNow < 1150){
            setMobile(true)
        }else{
            setMobile(false)
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
        window.addEventListener("resize",onChangeSize)
        return ()=>{
            clearInterval(timerSale)
            window.removeEventListener("resize",onChangeSize)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    const buttonCard = [
        {name:"add to cart",icon:<ShoppingBagOutlined/>,onClick:()=>{
            AddToCart({
                "id":props.id,
                "name":props.name,
                "price":`${props.price}`,
                "sale":`${Number(props.sale||0)/100}`,
                "timesale":`${props.timer}`,
                "picture":props.picture,
            },contextItem)
        },time:600},
        {name:"favorite",icon:<FavoriteBorderOutlined/>,onClick:()=>{},time:700},
        {name:"show more",icon:<RemoveRedEyeOutlined/>,onClick:()=>{
            contextItem.setFastViewOpen({
                isOpen:true,
                itemId:props.id,
            })}
            ,time:800}
    ]
    
    return (
        <> 
            <Box className = {`${CS.shopCard}`} sx={props.sx?props.sx:{height:"400px"}} 
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
                        <Box sx={{height:"250px",flex:1}}>
                            <img onClick={()=>{
                                    navigation(props.id)
                                }} 
                                className={CS.shopCardImage} src={props.picture}
                            />
                        </Box>
                        <Box sx={{
                            position:"absolute",
                            overflow:"hidden",
                            width:"100%",height:"20%",
                            bottom:"0" ,
                            display:"flex",flexDirection:"column",alignItems:"center"
                        }}>  
                            <Box>
                                {buttonCard.map((item)=>{ 
                                    return(                        
                                        <Slide key={item.name} direction="up" in={!mobile?hoverImage:true} timeout={item.time} mountOnEnter unmountOnExit>
                                            <IconButton onClick={item.onClick}>{item.icon}</IconButton>
                                        </Slide>
                                    )
                                })}                                                      
                            </Box>
                        </Box>
                        <Box sx={{position:"absolute",overflow:"hidden", width:"100%",}} bottom={mobile?"":"0"}>
                            {isCurrentSale&&<Slide direction="up" in={!mobile?!hoverImage:true} timeout={500} mountOnEnter unmountOnExit>
                                    <Typography sx={{color:"#B22222",backgroundColor:"rgba(0,0,0,0.4)",textAlign:"center"}}>
                                        {countDown}
                                    </Typography>
                            </Slide>}
                        </Box>
                        {isCurrentSale&&<Box sx={{position:"absolute",top:"10px",right:"10px"}} className={CS.salePill}>
                            {`- ${props.sale}%`}
                        </Box>}
                    </Box>
                    <Box>
                        <Typography>{props.name}</Typography>
                        <Stack direction={"row"} gap={"10px"}>
                            <Typography sx={{color:"#B22222"}} >
                                ${Number(props.price) - (Number(props.price)*Number((props.sale||0)/100))}
                            </Typography>
                            {isCurrentSale&&<Typography sx={{textDecoration:"line-through",color: "rgba(211, 211, 211, 0.55)"}}>
                                {t("conversion.money",{value:moneyConvert(props.price,i18n.language)})}
                            </Typography>}
                        </Stack>
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default ShopBox
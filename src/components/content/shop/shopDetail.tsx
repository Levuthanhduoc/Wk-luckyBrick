import { Box, Button, Divider, Fade, IconButton, Slide, Stack, SxProps, Tab, Tabs, Typography } from "@mui/material"
import Breakcrumb from "../../extra/breadcrumb"
import { SyntheticEvent, useEffect, useState } from "react"

import testpic from '../../../assets/image/placeholder/placeholder1.webp'
import PictureShowCase from "../../extra/pictureShowCase"
import CountDown from "../../extra/countDownTimer"
import CS from "../../../assets/css/component.module.css"
import { Add, AddShoppingCart, ArrowForwardIosOutlined, ArticleOutlined, FavoriteBorder, GppGoodOutlined,LocalShippingOutlined, Remove } from "@mui/icons-material"

import paypalIcon from '../../../assets/image/icon/paypal.png';
import masterCardIcon from '../../../assets/image/icon/Mastercard.png';
import visaIcon from '../../../assets/image/icon/visa.png';
import momoIcon from '../../../assets/image/icon/momo.png';
import zalopayIcon from '../../../assets/image/icon/zalo.png';
interface breadcrumbItem{
    name:string,
    path:string,
}
interface TabContentProps {
    children?: React.ReactNode,
    index: number,
    value: number,
    sx?:SxProps,
  }


const centerCss = {
    maxWidth:"1540px",width:"100%",margin:"auto",
    padding:{sm:"45px 15px 70px 15px",md:"45px 30px 70px 30px",lg:"45px 50px 70px 50px"}, 
}

const TabContent = (props:TabContentProps)=>{
    return(
        <Fade in={props.value == props.index} mountOnEnter unmountOnExit timeout={2000}>
            <Box role="tabpanel"
                hidden={props.value != props.index}
                id={`simple-tabpanel-${props.index}`}
                aria-labelledby={`simple-tab-${props.index}`}
                sx={{...props.sx,zIndex:"-1"}}> 
                {props.children}
            </Box>
        </Fade>
    )
}

function ShopDetail(){

    const itemData = {
        id:161845156,
        name:"Lego Dungeon and Dungeon",
        image: [testpic,testpic,testpic,testpic,testpic,testpic,testpic,testpic,testpic,testpic,testpic,testpic,testpic,testpic],
        price:10,
        sale:0.2,
        description:"test",
        info:{
            age:"18",
            pieces:"3893",
            serial:"000000",
            category:"minifigure"
        }
    }
    const [tab,settab] = useState(0)
    const [quantity,setQuantity] = useState(0)
    const [breadCrumb,setbreadCrumb] = useState<null|breadcrumbItem[]>(null)

    const paymentMethod = [
        {name:"master card",icon:masterCardIcon},
        {name:"paypal",icon:paypalIcon},
        {name:"visa",icon:visaIcon},
        {name:"momo",icon:momoIcon},
        {name:"zalopay",icon:zalopayIcon}
    ]

    const tabItems = [
        {id:"tab-0",name:"Description"},
        {id:"tab-1",name:"Additional Information"},
        {id:"tab-2",name:"Review"},
    ]

    const setNewbreadCrumb = ()=>{
        const current = window.location.pathname
        let newBreadcrumb:breadcrumbItem[]=[]
        if(current){
            const allpath = current.split("/")
            if(allpath.length >1){
                let merge ="" 
                for(const path of allpath){
                    merge = merge + path + "/"
                    if(path != ""){
                        newBreadcrumb.push({
                            name:path,
                            path:merge
                        })
                    }
                }
            }else{
                newBreadcrumb = [{
                    name:"",
                    path:""
                }]
            }
            setbreadCrumb(newBreadcrumb)
        }
    }

    useEffect(()=>{
        setNewbreadCrumb()
    },[])
    return(
        <>
            <Box sx={centerCss}>
                {breadCrumb&&<Breakcrumb sx={{width:"100%",margin:"auto",padding:"30px 0 30px 0"}} items={breadCrumb}/>}
                <Box sx={{display:"flex",flexDirection:{xs:"column",sm:"column",md:"row"},gap:"15px",width:"100%"}}>
                    <Box sx={{flex:1}}>
                        <PictureShowCase sx={{width:"100%",maxHeight:"500px",gap:"5px"}} pictures={itemData.image}/>
                    </Box>
                    <Box sx={{flex:1,display:"flex",flexDirection:"column", gap:"10px",padding:"0 15px 0 15px"}}>
                        <Typography sx={{fontSize: {md:"26px",lg:"28px"},lineHeight: {md:"31.2px",lg:"33.6px"}}}>{itemData.name}</Typography>
                        <Box display={"flex"} flexDirection={"row"} alignItems={"center"} gap={"15px"} sx={{fontSize: "20px",lineHeight: "20px"}}>
                            <Typography sx={{color:"#B22222", fontSize: "28px",lineHeight: "28px"}} >${itemData.price - (itemData.price*itemData.sale)}</Typography>
                            <Typography sx={{textDecoration:"line-through",color: "rgba(211, 211, 211, 0.55)",fontSize: "20px",lineHeight: "20px"}}>${itemData.price}</Typography>
                            <Box className={CS.salePill}>- {itemData.sale*100}%</Box>
                        </Box>
                        <Box sx={{
                            display: "inline-block",
                            padding: "16px 30px",
                            border: "1px solid #B22222",
                            borderRadius: "2.5px",
                            textAlign: "center",
                            minWidth: "300px"}}>
                            <Typography>HURRY UP! SALE ENDS IN:</Typography>
                            <CountDown timer={"10/29/2024"}/>
                        </Box>
                        <Box>
                            <Typography>Quantity</Typography>
                            <Box display={"flex"} flexDirection={"row"} alignItems={"center"} justifyContent={"space-between"} flexGrow={0} sx={{borderRadius:"5px",width: "127px",backgroundColor: "rgba(38, 38, 38,0.5)"}}>
                                <IconButton onClick={()=>setQuantity(quantity>0?quantity-1:0)}><Remove/></IconButton>
                                <Typography>{quantity}</Typography>
                                <IconButton onClick={()=>setQuantity(quantity+1)}><Add/></IconButton>
                            </Box>
                        </Box>
                        <Box>
                            <Button sx={{backgroundColor:"black" ,color:"white"}}>
                                <Typography sx={{paddingRight:"15px"}}>Add to cart</Typography>
                                <AddShoppingCart/>
                            </Button>
                            <IconButton>
                                <FavoriteBorder/>
                            </IconButton>
                        </Box>     
                        <Divider orientation="horizontal" flexItem />
                        <Button sx={{display:"flex",justifyContent:"space-between"}}>
                                <Stack direction={"row"} gap={"10px"}>
                                    <LocalShippingOutlined/><Typography>Deliveries and Returns</Typography>
                                </Stack>
                                <ArrowForwardIosOutlined/>
                        </Button>
                        <Divider orientation="horizontal" flexItem />
                        <Button sx={{display:"flex",justifyContent:"space-between"}}>
                            <Stack direction={"row"} gap={"10px"}>
                                <ArticleOutlined/><Typography>Building Instructions</Typography>
                            </Stack>
                            <ArrowForwardIosOutlined/>
                        </Button>
                        <Divider orientation="horizontal" flexItem />
                        <Stack display={"flex"} direction={"row"} alignItems={"center"} gap={"15px"} flexWrap={"wrap"}>
                            <GppGoodOutlined/>
                            <Typography>Guarantee Safe<br/>Checkout</Typography>
                            <Stack direction={"row"} gap={"5px"}>
                                {paymentMethod.map((item)=><img key={item.name} style={{width:"48px",height:"30px"}} alt={item.name} src={item.icon}/>)}
                            </Stack>
                        </Stack>
                    </Box>
                </Box>
                <Box sx={{border: "1px solid rgba(255, 255, 255, 0.12)",margin:"30px 0 30px 0",padding:"0 35px 0 35px ",borderRadius:"5px"}}>
                    <Tabs value={tab} onChange={(_e:SyntheticEvent,value)=>settab(value)}  variant="scrollable" scrollButtons="auto" allowScrollButtonsMobile>
                        {tabItems.map((item,index)=><Tab sx={{fontWeight:"bold"}} key={item.id} label={item.name} aria-controls= {`simple-tabpanel-${index}`} />)}
                    </Tabs>
                    <Divider orientation="horizontal" flexItem />
                    <Box sx={{padding:"35px 0 35px 0"}}>
                        <TabContent value={tab} index={0}>
                            {itemData.description}
                        </TabContent>
                        <TabContent value={tab} index={1}>
                            {itemData.info.age}
                        </TabContent>
                        <TabContent value={tab} index={2}>
                            {itemData.info.category}
                        </TabContent>
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default ShopDetail
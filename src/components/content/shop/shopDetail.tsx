import { Box, Button, Divider, Fade, FormControl, IconButton, MenuItem, Rating, Select, Stack, SxProps, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tabs, TextField, Typography } from "@mui/material"
import Breakcrumb from "../../extra/breadcrumb"
import { SyntheticEvent, useContext, useEffect, useState } from "react"
import PictureShowCase from "../../extra/pictureShowCase"
import CountDown from "../../extra/countDownTimer"
import CS from "../../../assets/css/component.module.css"
import { Add, AddShoppingCart, ArrowForwardIosOutlined, ArticleOutlined, FavoriteBorder, GppGoodOutlined,LocalShippingOutlined, Remove, Send } from "@mui/icons-material"

import paypalIcon from '../../../assets/image/icon/paypal.png';
import masterCardIcon from '../../../assets/image/icon/Mastercard.png';
import visaIcon from '../../../assets/image/icon/visa.png';
import momoIcon from '../../../assets/image/icon/momo.png';
import zalopayIcon from '../../../assets/image/icon/zalo.png';
import ProcessBar from "../../extra/processBar"
import { useParams } from "react-router-dom"
import fetchData from "../../../assets/module/fecthData"
import { getHtml } from "../../extra/richTextForm"
import { JSONContent } from "@tiptap/core"
import Parser from 'html-react-parser';
import AddToCart from "../../../assets/module/addtoCart"
import { Context } from "../../base/ContextWarper"
import { contextInterface } from "../../../AppTyscript"
import isSale from "../../../assets/module/isSale"

interface TabContentProps {
    children?: React.ReactNode,
    index: number,
    value: number,
    sx?:SxProps,
}

interface itemsData  {
    id:number,
    name:string,
    image_uploaded_png: string[] ,
    price:number,
    sale:number,
    description:JSONContent|undefined,
    age:string,
    pieces:string,
    serial:string,
    category:string,
    timesale:string
}
const apiUrl = import.meta.env.VITE_API_URL
const centerCss = {
    maxWidth:"1540px",width:"100%",margin:"auto",
    padding:{xs:"25px 0 0 0",sm:"45px 15px 70px 15px",md:"45px 30px 70px 30px",lg:"45px 50px 70px 50px"}, 
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
    const {id} = useParams()
    const [tab,settab] = useState(0)
    const [quantity,setQuantity] = useState(0)
    const [reviewScore,setReviewScore] = useState(0)
    const [selectSort,setSort] = useState<string>("relevant")
    const [isReviewOn,setReviewOn] = useState(false)
    const contextItem = useContext(Context) as contextInterface
    const [itemData,setItemData] = useState<itemsData>()

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

    const reviewSortOption = [
        {name:"Helpfulness",value:"helpfull"},
        {name:"Most relevant",value:"relevant"},
        {name:"Rating - Low to High",value:"ratingASC"},
        {name:"Rating: High to Low",value:"ratingDES"},
        {name:"Date - oldest first",value:"dateASC"},
        {name:"Date - newest first",value:"dateDES"},
    ]

    const reviewData = {
        total:152,
        detail:[7,2,7,11,125]
    }

    const calculateAverageScore=(total:number,items:number[],option?:{reverse:boolean})=>{
        let allItem = [...items]
        if(option){
            if(option.reverse){
                allItem = allItem.map((_item,index)=>allItem[Math.abs(index-(allItem.length - 1))])
            }
        }
        const calulating = allItem.reduce((total,current,index)=>total+(current * (index + 1)),0)/total
        return Math.floor(calulating*10)/10
    }
    const getData = async ()=>{ 
        if(apiUrl){
            try {
                const result = await fetchData({url:apiUrl +`legos/info?name=legos&id=${id}`,
                    methoud:"get"})
                if(result){
                    const rowsData = (result as {[key:string]:itemsData[]}).rows
                    setItemData(rowsData[0] as itemsData)
                }
            } catch (error) {
                console.log(error)
            }
        }
    }
    useEffect(()=>{
        getData()
    },[id])
    useEffect(()=>{
        setReviewScore(calculateAverageScore(reviewData.total,reviewData.detail,{reverse:false}))
    },[itemData])
    return(
        <>
            <Box sx={centerCss}>
                {<Breakcrumb sx={{width:"100%",margin:"auto",padding:"30px 0 30px 0"}}/>}
                {itemData&&<>
                <Box sx={{display:"flex",flexDirection:{xs:"column",sm:"column",md:"row"},gap:"15px",width:"100%"}}>
                    <Box sx={{flex:1,display:"flex",justifyContent:"center"}}>
                        <PictureShowCase sx={{width:"100%",height:"500px",gap:"5px"}} pictures={itemData.image_uploaded_png.map((img)=>apiUrl +"storage/"+ img)}/>
                    </Box>
                    <Box sx={{flex:1,display:"flex",flexDirection:"column", gap:"10px",padding:"0 15px 0 15px"}}>
                        <Typography sx={{fontSize: {md:"26px",lg:"28px"},lineHeight: {md:"31.2px",lg:"33.6px"}}}>{itemData.name}</Typography>
                        <Box display={"flex"} flexDirection={"row"} alignItems={"center"} gap={"15px"} sx={{fontSize: "20px",lineHeight: "20px"}}>
                            <Typography sx={{color:"#B22222", fontSize: "28px",lineHeight: "28px"}} >${itemData.price - (itemData.price*itemData.sale)}</Typography>
                            <Typography sx={{textDecoration:"line-through",color: "rgba(211, 211, 211, 0.55)",fontSize: "20px",lineHeight: "20px"}}>${itemData.price}</Typography>
                            {isSale(itemData.timesale)&&<Box className={CS.salePill}>- {itemData.sale*100}%</Box>}
                        </Box>
                        {isSale(itemData.timesale)&&<Box sx={{
                            display: "inline-block",
                            padding: {xs:"8px 15px",sm:"16px 30px"},
                            border: "1px solid #B22222",
                            borderRadius: "2.5px",
                            textAlign: "center",
                            minWidth: {xs:"100px",sm:"300px"}}}>
                            <Typography>HURRY UP! SALE ENDS IN:</Typography>
                            <CountDown timer={itemData.timesale}/>
                        </Box>}
                        <Box>
                            <Typography>Quantity</Typography>
                            <Box display={"flex"} flexDirection={"row"} alignItems={"center"} justifyContent={"space-between"} flexGrow={0} sx={{borderRadius:"5px",width: "127px",backgroundColor: "rgba(38, 38, 38,0.5)"}}>
                                <IconButton onClick={()=>setQuantity(quantity>0?quantity-1:0)}><Remove/></IconButton>
                                <Typography>{quantity}</Typography>
                                <IconButton onClick={()=>setQuantity(quantity+1)}><Add/></IconButton>
                            </Box>
                        </Box>
                        <Box>
                            <Button sx={{backgroundColor:"black" ,color:"white"}} 
                                onClick={()=>AddToCart({
                                    id:`${itemData.id}`,
                                    name:itemData.name,
                                    sale:`${itemData.sale}`,
                                    quantity:`${quantity}`,
                                    price:`${(itemData.price)}`,
                                    timesale:`${(itemData.timesale)}`,
                                    picture:apiUrl+"storage/"+itemData.image_uploaded_png[0],
                                    },contextItem
                                )}>
                                <Typography sx={{padding:"8px 8px 4px 8px"}}>Add to cart</Typography>
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
                        {/* description tab */}
                        <TabContent value={tab} index={0}>
                            {itemData.description&&Parser(getHtml(itemData.description))}
                        </TabContent>
                        {/* Additional Information tab */}
                        <TabContent value={tab} index={1}>
                        <TableContainer component={Box}>
                            <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                                <TableHead>
                                <TableRow>
                                    <TableCell align="center">Age</TableCell>
                                    <TableCell align="center">Serial Number</TableCell>
                                    <TableCell align="center">Total pieces</TableCell>
                                    <TableCell align="center">Category</TableCell>
                                </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                    <TableCell align="center">{itemData.age}</TableCell>
                                    <TableCell align="center">{itemData.serial}</TableCell>
                                    <TableCell align="center">{itemData.pieces}</TableCell>
                                    <TableCell align="center">{itemData.category}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                            </TableContainer>
                        </TabContent>
                        {/* review tab */}
                        <TabContent value={tab} index={2}>
                            <Stack direction={{xs:"column",md:"row"}} padding={"0 0 40px 0"}>
                                <Stack padding={{xs:"0 0 40px 0",md:"0"}}>
                                    <Typography>
                                        Overall Rating
                                    </Typography>
                                    <Stack direction={"row"} alignItems={"center"}>
                                        <Rating name="size-large" defaultValue={Math.floor(reviewScore)} size="large" readOnly/>
                                        <Typography sx={{padding:"8px 8px 2px 8px"}}>
                                            {reviewScore} ({reviewData.total} Reviews)</Typography>
                                    </Stack>
                                </Stack>
                                <Divider orientation={"vertical"} flexItem />
                                <Divider orientation={"horizontal"} flexItem />
                                <Stack flexGrow={1} padding={{xs:"40px 0 0 0",md:"0 0 0 40px"}}>
                                    {reviewData.detail.map((_review,index)=>{
                                        const newIndex = Math.abs(index - 4)
                                        const percent = (reviewData.detail[newIndex]/reviewData.total)*100 
                                        return<Stack key={index} direction={"row"} justifyItems={"center"} alignItems={"center"}>
                                            <Typography sx={{flexShrink:0}}>{newIndex + 1} star</Typography>
                                            <ProcessBar sx={{width:{xs:"100px",sm:"300px",md:"25vw"}}} fill={percent} />
                                            <Typography sx={{flexShrink:0}}>{"("}{reviewData.detail[newIndex]}{")"}</Typography>
                                        </Stack>
                                    })}
                                </Stack>
                            </Stack>
                            <Divider orientation="horizontal" flexItem />
                            <Stack padding={{xs:"40px 0 40px 0"}}>
                                <Stack gap={"10px"}>
                                    {!isReviewOn?<Button onClick={()=>setReviewOn(true)}>Leave a review</Button>:
                                    <Box sx={{width:"100%",position:"relative"}}>
                                        <TextField id="outlined-basic" sx={{width:"100%"}} label="Review" rows={5} variant="outlined" multiline/>
                                        <IconButton sx={{position:"absolute",bottom:0,right:0}} onClick={()=>setReviewOn(false)}>
                                            <Send/>
                                        </IconButton>
                                    </Box>}
                                    <FormControl size="small">
                                        <Select sx={{padding:"0"}} value={selectSort} onChange={(e)=>{setSort(e.target.value)}} id={"sortOption"}>
                                            {reviewSortOption.map((item)=><MenuItem key={item.name} value={item.value}>{item.name}</MenuItem>)}
                                        </Select>
                                    </FormControl>
                                </Stack>
                            </Stack>
                        </TabContent>
                    </Box>
                </Box></>}
            </Box>
        </>
    )
}

export default ShopDetail
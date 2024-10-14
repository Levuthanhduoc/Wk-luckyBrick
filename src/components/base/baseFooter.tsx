import {Box,Button,Card,Divider,Grid2,IconButton, InputBase, Link, List, ListItem, ListItemText, SvgIcon, Typography, useColorScheme} from "@mui/material"
import FacebookRoundedIcon from '@mui/icons-material/FacebookRounded';
import RedditIcon from '@mui/icons-material/Reddit';
import XIcon from '@mui/icons-material/X';
import { Loyalty} from "@mui/icons-material";

import TiktokIcon from '../../assets/image/icon/tiktok.tsx';
import paypalIcon from '../../assets/image/icon/paypal.png';
import masterCardIcon from '../../assets/image/icon/Mastercard.png';
import visaIcon from '../../assets/image/icon/visa.png';
import momoIcon from '../../assets/image/icon/momo.png';
import zalopayIcon from '../../assets/image/icon/zalo.png';


function BaseFooter(){
    const {mode}= useColorScheme()

    const followUs = [
        {name:"facebook",icon:<FacebookRoundedIcon/>},
        {name:"reddit",icon:<RedditIcon/>},
        {name:"twitter",icon:<XIcon/>},
        {name:"tiktok",icon:<SvgIcon ><TiktokIcon/></SvgIcon>}
    ]
    const companyInfo = [
        {name:"Address",detail:"1234 shop, brick 567,White York, NY 69024"},
        {name:"Email",detail:"luckyBrick@hamil.com"},
        {name:"Phone",detail:"000000000000"},
    ]
    const exInfo = [{
        title:"Help",
        content:[
            {name:"Privacy Policy",path:""},
            {name:"Returns",path:""},
            {name:"Terms & Conditions",path:""},
            {name:"Shipping",path:""},
            {name:"FAQ\u0027s",path:""}
        ]
    },{
        title:"About us",
        content:[
            {name:"Contact Us",path:""},
            {name:"Account",path:""},
        ]
    }
    ]
    const paymentMethod = [
        {name:"master card",icon:masterCardIcon},
        {name:"paypal",icon:paypalIcon},
        {name:"visa",icon:visaIcon},
        {name:"momo",icon:momoIcon},
        {name:"zalopay",icon:zalopayIcon}
    ]

    return(
        <>  
            <Box className="app-footer" sx={{ height:"100%",backgroundColor:`${mode=="light"?"#0d47a1":"#0a3057"}`,color:"#fff", padding:{md:"0 10vw 0 10vw"}}}>
                <Box sx={{padding:{xs:"20px" ,sm:"40px",md:"50px"}}}>
                    <Grid2 container spacing={{xs:2,sm:2,md:3}} columns={{xs:1,sm:2,md:4,lg:6}} sx={{paddingBottom:"20px"}}>
                        <Grid2 size={2}>
                            <Typography variant="h6" sx={{fontWeight:"bold"}}>LuckyBrick</Typography>
                            <List sx={{textAlign:"left"}}>
                                {companyInfo.map((item)=>{
                                    return(
                                        <ListItem key={item.name} sx={{paddingLeft:0,paddingRight:0}}>
                                            <ListItemText>{item.name}: {item.detail}</ListItemText>
                                        </ListItem>
                                    )
                                })}
                            </List>
                            <Box sx={{padding:"10px 0 10px 0"}}>
                                <Typography variant="h6" sx={{fontWeight:"bold"}}>
                                    Follow Us
                                </Typography>
                                <Box sx={{display:"flex",gap:"10px", padding:"8px 0 8px 0"}}>
                                    {followUs.map((item)=>{
                                        return(
                                            <IconButton sx={{padding:0 ,color:"#fff"}} key={item.name} aria-label={item.name}>
                                                    {item.icon}
                                            </IconButton>
                                        )
                                    })}
                                </Box>
                            </Box>
                        </Grid2>
                        {exInfo.map((item)=>{
                            return(
                                <Grid2 size={1} key={item.title}>
                                    <Typography variant="h6" sx={{fontWeight:"bold"}}>{item.title}</Typography>
                                    <List>
                                        {item.content.map((c)=>{
                                            return(
                                                <ListItem key={c.name} sx={{paddingLeft:0,paddingRight:0}}>
                                                    <Link underline="none" sx={{color:"#fff"}} href={c.path}>{c.name}</Link>
                                                </ListItem> 
                                            )
                                        })}
                                    </List>                                    
                                </Grid2>
                            )
                        })}
                        <Grid2 size={2}>
                            <Typography variant="h6" sx={{fontWeight:"bold"}}>Sign Up for Email</Typography>
                            <List>
                                <ListItem sx={{paddingLeft:0,paddingRight:0}}>
                                    Sign up to get first dibs on new arrivals, sales, exclusive content, events and more!
                                </ListItem>
                                <ListItem sx={{paddingLeft:0,paddingRight:0}}>
                                    <Card sx={{display:"flex",justifyContent:"center"}}>
                                        <InputBase sx={{padding:"10px"}} placeholder="Enter you email..." id="subscribe-email"/>
                                        <Button sx={{margin:"5px"}} variant="contained" endIcon={<Loyalty/>}>Subscribe</Button>
                                    </Card>
                                </ListItem>
                            </List>
                        </Grid2>
                    
                    </Grid2>
                    <Divider/>
                    <Box sx={{display:"flex",alignItems:"center",paddingTop:"20px", justifyContent:"space-between"}}>
                        <Box sx={{}}>
                            <Typography>© 2024 Lucky Brick. All Rights Reserved</Typography>
                        </Box>
                        <Box>
                            {paymentMethod.map((item)=><img key={item.name} style={{width:"48px",height:"30px"}} alt={item.name} src={item.icon}/>)}
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default BaseFooter
import { freeObject,contextInterface} from '../../AppTyscript';
import {Dispatch, memo, SetStateAction, useContext, useEffect, useRef, useState} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {Badge, InputAdornment, LinearProgress, Menu, Link as MuiLink, Slide, TextField} from '@mui/material';
import {Avatar, FormControl, MenuItem, Select, 
  useColorScheme 
} from '@mui/material';
import {useTranslation} from 'react-i18next'
import { Link,useLocation,useNavigate } from 'react-router-dom';
import {v4 as uuid4} from 'uuid'

// import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
// import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
// import Brightness4Icon from '@mui/icons-material/Brightness4';
import ShoppingCartOutlinedIcon from'@mui/icons-material/ShoppingCartOutlined'
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined'

import navItems from '../../_navItem'
import langConfig from '../../assets/language/config'
import cookieToObject from '../../assets/module/cookie2Object';
import { Context } from './ContextWarper';
import { AdminPanelSettings, Search } from '@mui/icons-material';
import logout from '../../assets/module/logout';
import PreviewCard from '../extra/previewCard';
import fetchData from '../../assets/module/fecthData';

const drawerWidth = 240;
const apiUrl = import.meta.env.VITE_API_URL

const ChangeAvatar = (props:{data:freeObject|null })=>{
  const mountRef = useRef<HTMLButtonElement|null>(null)
  const [isOpen,setOpen] = useState(false)
  const {setSnack,setLogin} =useContext(Context) as contextInterface
  const navigate = useNavigate()

  const onclick = ()=>{
    setOpen(true)
  }

  const onLogout = (message:unknown)=>{
    setSnack({isOpen:true,message:message as string});
    setLogin(false)
    setOpen(false)
    navigate("/");
  }

  const onLogoutFail = ()=>{
    setSnack({isOpen:true,message:"Oop something happen please try again"});
  }

  return(
    <>
     {props.data&&props.data["name"]?
        <Button ref={mountRef} sx={{minWidth:0,color: '#fff' }} onClick={onclick}>
            <Avatar>{props.data["name"][0]}</Avatar>
        </Button>
      :<Link to={"/signin"}>
        <Button sx={{minWidth:0,color: '#fff' }}>
            <PermIdentityOutlinedIcon/>
        </Button>
      </Link>}
      <Menu
        id="basic-menu"
        anchorEl={mountRef.current}
        open={isOpen}
        onClose={()=>setOpen(false)}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={()=>{console.log("a")}}>Profile</MenuItem>
        <MenuItem onClick={()=>{console.log("a")}}>My account</MenuItem>
        <MenuItem onClick={()=>logout({onSuccess:onLogout,onFail:onLogoutFail})}>Logout</MenuItem>
      </Menu>
    </>
  )
}

const SearchDrawer = memo((props:{setDrawer:Dispatch<SetStateAction<boolean>>}) =>{
  const [searchResult,setSearchResult] = useState<unknown[]|null>(null)
  const [loading,setLoading] = useState(false)
  const [searchMessage,setSearchmessage] = useState<string|null>(null)

  const handleSubmit = async(event: React.FormEvent<HTMLFormElement>) =>{
    event.preventDefault()
    const data = new FormData(event.currentTarget);
    const searchText = `${data.get("searchInput")}`
    if(searchText == "null"){
      return
    }
    const result = await fetchData({
      url:apiUrl + `legos/search?q=${encodeURIComponent(searchText.trim())}`,
      methoud:"get",
    }) as {rows:[]}
    if(result.rows.length > 0){
      setSearchResult(result.rows)
    }else{
      setSearchmessage(`Can't find: ${searchText}`)
    }
    setLoading(false)
  }

  const resetSearch = ()=>{
    setSearchResult(null);
    setLoading(true)
    setSearchmessage(null)
  }
  return (
    <Box sx={{padding:{xs:"10px 15px 0px 15px",md:"50px 22px 0px 22px"}}}>
      <Typography fontSize={"28px"} lineHeight={{xs:"40px",md:"28px"}} margin={"0 0 10px 0"}>
        Search
      </Typography>
      <Box component="form"
        onSubmit={(e)=>{
          handleSubmit(e);
          resetSearch();
        }}
        noValidate
      >
        <FormControl>
          <TextField
            id="searchInput"
            type="text"
            name="searchInput"
            autoComplete="searchInput"
            autoFocus
            label=""
            sx={{
              margin:"0 0 10px 0",fontSize:"16px",
              lineHeight:"26px",width:"100%"
            }}
            size="small"
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment sx={{height:"5px"}} position="start">
                    <Search />
                  </InputAdornment>
                ),
              },
            }}
            variant="outlined"
          />
        </FormControl>
      </Box>
      {!loading?<Divider/>:<LinearProgress />}
      <Box sx={{margin:"10px 0 0 0",padding:"5px"}} 
        gap={"10px"} 
        display={"flex"}
        flexDirection={"column"}
        border={"1px solid rgba(255, 255, 255, 0.23)"} 
        borderRadius={"4px"}
      >
        <Typography>{searchMessage}</Typography>
        <Box onClick={()=>props.setDrawer(false)}>
          {searchResult&&searchResult.map((item)=>
            <>
              <PreviewCard key={uuid4()} {...item as {name:string,image_uploaded_png:string,sale:string,price:string,gametitle:string}}/>
              <Divider key={uuid4()} sx={{margin:"10px 0 10px 0"}}/>
            </>
          )}
        </Box>
      </Box>
    </Box>
  )
})


function BaseHeader(){
  const { mode, setMode } = useColorScheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [language,setLanguage] = useState("en")
  const navigate = useNavigate()
  const {t,i18n:{changeLanguage}} = useTranslation();
  const location = useLocation()
  const [userInfo,setUserInfo] = useState<freeObject|null>(null)
  const {isLogin,cart} = useContext(Context) as contextInterface
  const currentScroll = useRef(0)
  const [hidden,setHidden] = useState(false)
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  }

  const handleSearchDrawerToggle = () => {
    setSearchOpen((prevState) => !prevState);
  }

  if(mode != "dark"){
    setMode("dark")
  }

  // if (!mode) {
  //   return null;
  // }
  // const changeTheme = ()=>{
  //   let option:string
  //   switch(mode){
  //     case "light":
  //       option = "dark"
  //       break;
  //     case "dark":
  //       option = "system"
  //       break;
  //     case "system":
  //       option = "light"
  //       break;
  //     default:
  //       option = "light"
  //   }
  //   setMode(option as "dark"|"light"|"system")
  // }

  const LanguageSelect = ()=>{
    return(
      <FormControl sx={{width:"50px"}}  variant="standard">
        <Select
          labelId="language-select"
          id="language-select"
          value={language}
          onChange={(e)=>{
            setLanguage(e.target.value)
            changeLanguage(e.target.value)
          }}
        >
          {langConfig.map((lang)=>
            <MenuItem key={lang.name} value={lang.name}>{lang.icon}</MenuItem>
          )}
        </Select>
      </FormControl>
    )
  }

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2,cursor:"pointer"}} onClick={()=>navigate("/")}>
        LUCKY BRICK
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
            <ListItem key={item.alt}  disablePadding>
                <ListItemButton onClick={()=>navigate(item.path)} sx={{ textAlign: 'center' }}>
                  <ListItemText primary={t(item.name)} />
                </ListItemButton>
            </ListItem>
        ))}
        {userInfo&&(userInfo["role"]=="admin"?
            <ListItem sx={{ textAlign: 'center',display:"flex",justifyContent:"center" }}  disablePadding>
              <ListItemButton onClick={()=>navigate("admin")} sx={{ textAlign: 'center' }}>
                <ListItemText primary={t("Admin")} />
              </ListItemButton>
            </ListItem>:"")}
        <ListItem sx={{ textAlign: 'center',display:"flex",justifyContent:"center" }}  disablePadding>
                <LanguageSelect/>
            </ListItem>
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window.document.body : undefined;

  const getUserInfo = ()=>{
    const info = cookieToObject()
    setUserInfo(info)
  }

  const checkScollDown = ()=>{
    if(currentScroll.current < window.scrollY){
      setHidden(true)
    }else{
      setHidden(false)
    }
    currentScroll.current = window.scrollY
  }

  useEffect(()=>{
    document.addEventListener("scrollend",checkScollDown)
    return ()=>{
      document.removeEventListener("scrollend",checkScollDown)
    }
  },[])

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(()=>{
    getUserInfo()
  },[isLogin])

  return (
    <Box className="app-header" sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar className='app-bar' 
        sx={{
          position:{xs:"relative",md:"fixed"},background: 'linear-gradient(to bottom,#0033A0, #001F3F)',}} 
        component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            fontFamily={'Modak'}
            fontSize={"1.6rem"}
            sx={{ flexGrow: 1, display: 'block' ,cursor:"pointer"}}
            onClick={()=>navigate("/")}
            >
            LUCKY BRICK
          </Typography>
          <Box sx={{display:"block",textAlign:"center"}}>            
            <IconButton onClick={handleSearchDrawerToggle}>
              <Search/>
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'none', md: 'block' } }}>
            {navItems.map((item,index) => (
              <Link to={item.path} key={index+item.name}>
                <Button sx={{color: `${location.pathname == item.path?"#007bff":'#fff'}`}}>
                  {t(item.name)}
                </Button>
              </Link>
            ))}
            {userInfo&&(userInfo["role"]=="admin"?<MuiLink href={"#admin"}>
              <Button sx={{color: `${location.pathname == "Admin"?"#007bff":'#fff'}`}}>
                {t("Admin")}
              </Button>
            </MuiLink>:"")}
          </Box>
          <Box sx={{display:'block'}}>
              <ChangeAvatar data={userInfo}/>
              <Link to={"cart"}>
                <Button sx={{minWidth:0,color: '#fff' }}>
                  <Badge color="secondary" badgeContent={cart?.length} max={999}>
                    <ShoppingCartOutlinedIcon/>
                  </Badge>
                </Button>
              </Link>
            {/* <Button onClick={()=>changeTheme()} sx={{minWidth:0,color: '#fff' }}>
                {
                  mode =="light"?<LightModeOutlinedIcon/>:
                  mode=="dark"?<DarkModeOutlinedIcon/>:<Brightness4Icon/>}
            </Button> */}
          </Box>
          <Box sx={{display:{xs:"none",sm:"block"},marginLeft:"6px",textAlign:"center"}}>            
            <LanguageSelect/>
          </Box>
        </Toolbar>
      </AppBar>
      {/* bottom bar for mobile */}
      {<Slide direction='up' in={!hidden} mountOnEnter unmountOnExit>
        <AppBar position="fixed" className='app-bar' component="nav"
              sx={{top: 'auto', 
                minHeight:"56px", 
                bottom: 0 ,background: 'linear-gradient(to bottom,#0033A0, #001F3F)',
                boxShadow: "0px 2px 4px -1px rgba(0,0,0,0.2)",
                display:{xs:"flex",md:"none"},flexDirection:"row",justifyContent:"space-around",alignItems:"center"
              }} 
        >
            {navItems.map((item,index) => (
              <Link to={item.path} key={index+item.name} 
                style={{
                  textDecoration:"none",
                  display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",
                  color: `${location.pathname == item.path?"#007bff":'#fff'}`
                }}>
                  <IconButton>
                    {item.icon}
                  </IconButton>
                  <Typography fontSize={"12px"} fontWeight={600} lineHeight={"12px"}>{t(item.name)}</Typography>
              </Link>
            ))}
            {userInfo&&(userInfo["role"]=="admin"?<MuiLink href={"#admin"} sx={{textDecoration:"none"}}>
              <IconButton sx={{color: `${location.pathname == "Admin"?"#007bff":'#fff'}`}}>
                <AdminPanelSettings/>
              </IconButton>
              <Typography color={`${location.pathname == "Admin"?"#007bff":'#fff'}`} fontSize={"12px"} fontWeight={600} lineHeight={"12px"}>{t("Admin")}</Typography>
            </MuiLink>:"")}
            <Link to={"cart"} style={{textDecoration:"none",color: `${location.pathname == "/cart"?"#007bff":'#fff'}` ,
              display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",
            }}>
                <Button sx={{minWidth:0,color:"#fff" }}>
                  <Badge color="secondary" badgeContent={cart?.length} max={999}>
                    <ShoppingCartOutlinedIcon/>
                  </Badge>
                </Button>
                <Typography fontSize={"12px"} fontWeight={600} lineHeight={"12px"}>{t("Cart")}</Typography>
            </Link>
      </AppBar></Slide>}
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <Drawer 
        open={searchOpen} 
        onClose={handleSearchDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        anchor="right"
        sx={{
          display: "block",
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: {xs:"320px",sm:"400px",md:"463px"} },
        }}
      >
        <SearchDrawer setDrawer={setSearchOpen}/>
      </Drawer>
    </Box>)
}

export default BaseHeader
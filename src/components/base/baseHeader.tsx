import {useState} from 'react';
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
import {FormControl, MenuItem, Select, useColorScheme } from '@mui/material';
import {useTranslation} from 'react-i18next'
import { Link,useNavigate } from 'react-router-dom';

import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import Brightness4Icon from '@mui/icons-material/Brightness4';

import navItems from '../../_navItem'
import toolItems from '../../_toolItem'
import langConfig from '../../assets/language/config'

const drawerWidth = 240;


function BaseHeader(){
  const { mode, setMode } = useColorScheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [language,setLanguage] = useState("en")
  
  const navigate = useNavigate()
  const {t,i18n:{changeLanguage}} = useTranslation();
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  }

  if (!mode) {
    return null;
  }
  const changeTheme = ()=>{
    let option:string
    switch(mode){
      case "light":
        option = "dark"
        break;
      case "dark":
        option = "system"
        break;
      case "system":
        option = "light"
        break;
      default:
        option = "light"
    }
    setMode(option as "dark"|"light"|"system")
  }

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
      <Typography variant="h6" sx={{ my: 2 }}>
        LUCKY BRICK
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
            <ListItem  disablePadding>
                <ListItemButton onClick={()=>navigate(item.path)} sx={{ textAlign: 'center' }}>
                  <ListItemText primary={t(item.name)} />
                </ListItemButton>
            </ListItem>
        ))}
        <ListItem sx={{ textAlign: 'center',display:"flex",justifyContent:"center" }}  disablePadding>
                <LanguageSelect/>
            </ListItem>
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window.document.body : undefined;

  return (
    <Box className="app-header" sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav">
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
            sx={{ flexGrow: 1, display: 'block' }}
          >
            LUCKY BRICK
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {navItems.map((item,index) => (
              <Link to={item.path} key={index+item.name}>
                <Button sx={{color: '#fff' }}>
                  {t(item.name)}
                </Button>
              </Link>
            ))}
          </Box>
          <Box sx={{display:'block'}}>
            {toolItems.map((item,index) => (
              <Link key={index} to={item.path}>
                <Button sx={{minWidth:0,color: '#fff' }}>
                  {item.icon}
                </Button>
              </Link>
            ))}
            <Button onClick={()=>changeTheme()} sx={{minWidth:0,color: '#fff' }}>
                {
                  mode =="light"?<LightModeOutlinedIcon/>:
                  mode=="dark"?<DarkModeOutlinedIcon/>:<Brightness4Icon/>}
            </Button>
          </Box>
          <Box sx={{display:{xs:"none",sm:"block"},marginLeft:"6px",textAlign:"center"}}>            
            <LanguageSelect/>
          </Box>
        </Toolbar>
      </AppBar>
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
    </Box>)
}

export default BaseHeader
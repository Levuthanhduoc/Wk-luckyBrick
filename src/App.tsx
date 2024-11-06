import React, {Suspense, useState} from 'react'
import './App.css'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CircularProgress, CssBaseline } from '@mui/material';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ContextWarper } from './components/base/ContextWarper';

const Base = React.lazy(()=>import('./components/base/base'))
const AdminDashbroad = React.lazy(()=>import('./components/dashboard/Dashboard'))
const SnackNotification = React.lazy(()=>import('./components/extra/snackNotification'))
function App() {
  const [snack,setSnack] = useState({isOpen:false,message:""})
  const [isLogin,setLogin] = useState(false)
  const theme = createTheme({
    components:{
      MuiCssBaseline:{
        styleOverrides:{
          body:{
            backgroundImage: `'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))'`,
          }
        }
      }
    },
    colorSchemes: {
      dark: {
        palette: {
          primary: {
            main: '#1976d2',  
            dark: '#115293',  
          },
          secondary: {
            main: '#dc004e',  
          },
          background: {
            default: '#0d1b2a', 
            paper: '#007BFF',   
          },
          text: {
            primary: '#ffffff', 
            secondary: '#b0bec5', 
          },
        }
      }
    },
  });
  
  return (
    <>
      <ContextWarper value ={{snack,setSnack,isLogin,setLogin}} >
        <ThemeProvider theme={theme}>
          <CssBaseline/>
          <BrowserRouter>  
          <Suspense fallback={<CircularProgress/>}>
            <Routes>
              <Route path={"/admin/*"} element={<AdminDashbroad/>}/>
              <Route path={"/*"} element={<Base/>}/>
            </Routes>                
          </Suspense>                
          </BrowserRouter>
          <SnackNotification/>
        </ThemeProvider>    
      </ContextWarper>
    </>
  )
}

export default App

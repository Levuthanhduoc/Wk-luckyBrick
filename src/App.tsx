import React from 'react'
import './App.css'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';


const BaseHeader = React.lazy(()=>import('./components/base/baseHeader'))
const BaseFooter = React.lazy(()=>import('./components/base/baseFooter'))
const BaseContent = React.lazy(()=>import('./components/base/baseContent'))

function App() {
  const theme = createTheme({
    components:{
      MuiCssBaseline:{
        styleOverrides:{
          body:{
            backgroundImage: `linear-gradient(to bottom, #0A1D2E, #001F3F, #0033A0)`,
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
        <ThemeProvider theme={theme}>
          <CssBaseline/>
          <BrowserRouter>  
            <BaseHeader/>
            <BaseContent/>
            <BaseFooter/>
          </BrowserRouter>
        </ThemeProvider>    
    </>
  )
}

export default App

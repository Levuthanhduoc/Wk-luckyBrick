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
            paper: '#0d47a1',   
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

import React from "react"
import cookieToObject from "./assets/module/cookie2Object"

const ShoppingCartOutlinedIcon = React.lazy(()=> import('@mui/icons-material/ShoppingCartOutlined'))
const PermIdentityOutlinedIcon = React.lazy( ()=>import('@mui/icons-material/PermIdentityOutlined'))

console.log(document.cookie)

function switchToolBar(){
    const cookie = cookieToObject()
    console.log(cookie)
}
switchToolBar()

export default [
    {path:"/signin",alt:"User",icon:<PermIdentityOutlinedIcon/>},
    {path:"",alt:"Shopping cart",icon:<ShoppingCartOutlinedIcon/>}
]
import React from "react"

const ShoppingCartOutlinedIcon = React.lazy(()=> import('@mui/icons-material/ShoppingCartOutlined'))
const PermIdentityOutlinedIcon = React.lazy( ()=>import('@mui/icons-material/PermIdentityOutlined'))

export default [
    {path:"",alt:"User",icon:<PermIdentityOutlinedIcon/>},
    {path:"",alt:"Shopping cart",icon:<ShoppingCartOutlinedIcon/>}
]
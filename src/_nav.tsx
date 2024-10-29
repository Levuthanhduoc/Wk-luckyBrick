import React from "react";

const Home = React.lazy(()=>import("./components/content/home/home"))
const Game = React.lazy(()=>import("./components/content/game/webgame"))
const Shop = React.lazy(()=>import("./components/content/shop/shop"))
const Turorial = React.lazy(()=>import("./components/content/tutorial/Turorial"))
const ShopDetail = React.lazy(()=>import("./components/content/shop/shopDetail"))

export default [
    {path:"/",alt:"Home",element:<Home/>},
    {path:"/home",alt:"Home",element:<Home/>}, 
    {path:"/shop",alt:"Shop",element:<Shop/>},
    {path:"/shop/detail",alt:"Shop detail",element:<Shop/>}, 
    {path:"/shop/detail/:id",alt:"Shop detail id",element:<ShopDetail/>},
    {path:"/game",alt:"Game",element:<Game/>},
    {path:"/tutorial",alt:"Creator Lab",element:<Turorial/>},
];
import React from "react";

const Home = React.lazy(()=>import("./components/content/home/home"))
const Game = React.lazy(()=>import("./components/content/game/webgame"))
const Shop = React.lazy(()=>import("./components/content/shop/shop"))
const ShopDetail = React.lazy(()=>import("./components/content/shop/shopDetail"))
const Turorial = React.lazy(()=>import("./components/content/tutorial/Turorial"))
const TutorialDetail = React.lazy(()=>import("./components/content/tutorial/tutorialDetail"))
const GameDetail = React.lazy(()=>import("./components/content/game/gameDetail"))
const SignIn = React.lazy(()=>import("./components/sign-in/SignIn"))
const Signup = React.lazy(()=>import("./components/sign-up/SignUp"))
const ShopCart = React.lazy(()=>import("./components/content/shopCart/shopCart"))

export default [
    {path:"/",alt:"Home",element:<Shop/>},
    {path:"/home",alt:"Home",element:<Home/>}, 
    {path:"/shop",alt:"Shop",element:<Shop/>}, 
    {path:"/shop/:id",alt:"Shop detail id",element:<ShopDetail/>},
    {path:"/game",alt:"Game",element:<Game/>},
    {path:"/game/:id",alt:"Game detail",element:<GameDetail/>},
    {path:"/tutorial",alt:"Creator Lab",element:<Turorial/>},
    {path:"/tutorial/:id",alt:"Creator Lab detail",element:<TutorialDetail/>},
    {path:"/cart",alt:"Shopping Cart",element:<ShopCart/>},
    {path:"/signin",alt:"Sign In",element:<SignIn/>},
    {path:"/signup",alt:"Sign In",element:<Signup/>},
];
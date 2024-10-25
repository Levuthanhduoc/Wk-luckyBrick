import { Box, Button, Grid2, IconButton, Pagination, Popover, Stack } from "@mui/material";
import GameCard from "./gameCard";
import placeHolder3 from '../../../assets/image/placeholder/placeHolder3.jpg'
import { useEffect, useRef, useState } from "react";

import CS from '../../../assets/css/component.module.css'
import { Gamepad, Search, SportsEsports } from "@mui/icons-material";
import SearchBar from "../../extra/searchBar";

import farm from '../../../assets/image/placeholder/Normal_HeartlakeFarm.jpg'
import race from '../../../assets/image/placeholder/Racetrack_splash.png'
import space from '../../../assets/image/placeholder/planet-hopper.png'

interface defaultData{
    name:string,
    picture:string
}


function WebGame(){
    const data = [{
        name:"testGame1",picture:placeHolder3},
        {name:"testGame2",picture:placeHolder3},
        {name:"testGame3",picture:placeHolder3},
        {name:"testGame4",picture:placeHolder3},
        {name:"testGame5",picture:placeHolder3},
        {name:"testGame6",picture:placeHolder3},
        {name:"testGame7",picture:placeHolder3},
        {name:"testGame8",picture:placeHolder3},
        {name:"testGame9",picture:placeHolder3},
        {name:"testGame10",picture:placeHolder3},
        {name:"testGame11",picture:placeHolder3},
        {name:"testGame12",picture:placeHolder3},
        {name:"testGame13",picture:placeHolder3},
    ]
    const trendingData = [
        {name:"farm",picture:farm},
        {name:"space",picture:space},
        {name:"race",picture:race}
    ]
    const [page,setPage] = useState(1)
    const [gameBar,setgameBar] = useState(false)
    const [currentCatalog,setCurrentCatalog] = useState("popular")
    const [isSearch,setSearch] = useState(false)
    const [itemData,setItemData] = useState(data)
    const [trendData,setTrendData] = useState(trendingData)
    const searchB = useRef(null)
    const [bannerSelect,setBannerSelect] = useState(1)
    const centerCss = {
        maxWidth:"1540px",width:"100%",margin:"auto",
        padding:{sm:"45px 15px 70px 15px",md:"45px 30px 70px 30px",lg:"45px 50px 70px 50px"}, 
    }

    

    const gamebarItems = [
        {id:"popular",name:"Popular",},
        {id:"explore",name:"Explore"},
        {id:"new",name:"New"}
    ]

    const rePos =(condition:boolean):object=>{
        if(condition){
            return {padding:{xs:`55px 5px 10px 5px`,sm:`65px 5px 5px 5px`,md:`64px 25px 5px 25px`}}
        }else{
            return {padding:{xs:`38px 5px 20px 5px`,sm:`38px 5px 20px 5px`,md:`15px 25px 20px 25px`}}
        }
    }

    const onScroll = ()=>{
        const nowPos = window.scrollY
        if(nowPos > 50){
            setgameBar(true)
        }else{
            setgameBar(false)
        }
    }
    const onSearch = (defaultData:defaultData[],query:string,section:string)=>{
        const filtered = defaultData.filter((item)=>item[section as "name"].toLowerCase().includes(query.toLowerCase()))
        setPage(1)
        if(query == ""){
            setItemData(defaultData)
        }else{
            setItemData(filtered)
        }
    }

    useEffect(()=>{
        document.addEventListener("scroll",onScroll)
        return()=>{
            document.removeEventListener("scroll",onScroll)
        }
    })
    return (
        <>
            <Box sx={{position:"relative"}}>
                <Box className={gameBar?CS.fixedBox:""} sx={{...rePos(gameBar)}}>
                    <Box className={CS.gameBar} sx={{
                        display:"flex",flexDirection:"row",justifyContent:"space-between",
                        position:"relative",backgroundColour: "rgba(255, 255, 255, 0.7)",
                        backdropFilter: "blur(10px)",
                        borderRadius:"0 0 50px 50px",
                        padding:"0 10px 0 10px",
                    }}>
                        <Box sx={{position:"absolute",top:0,left:0,width:"100%",height:"100%"}}/>
                        <IconButton>
                            <Gamepad/>
                        </IconButton>
                        <Stack display={"flex"} direction={"row"}>
                            {gamebarItems.map((item)=>{
                            let selected = {}
                            if(currentCatalog == item.id){
                                selected= {height:"100%",backgroundColor:"white"}
                            }
                            return<Box key={item.id}>
                                <Button  sx={{...selected,fontWeight:"bold"}} onClick={()=>{
                                    setCurrentCatalog(item.id)
                                }}>
                                    {item.name}
                                </Button>
                            </Box>
                            })}
                        </Stack>
                        <IconButton ref={searchB} id="searchButton" onClick={()=>setSearch(true)}>
                            <Search/>
                        </IconButton>
                        <Popover
                            id="searchButton"
                            open={isSearch}
                            anchorEl={searchB.current}
                            onClose={()=>setSearch(false)}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            >
                            <Box sx={{padding:"5px"}}>
                                <SearchBar onSearch={(query:string)=>onSearch(data,query,"name")}/>
                            </Box>
                        </Popover>
                    </Box>
                </Box>
                <Box sx={{
                    backgroundImage:"radial-gradient(circle, rgba(0, 51, 160, 0.3), rgba(0, 31, 63, 0.3))",
                    display:"flex",flexDirection:"row",
                    justifyContent:"center",alignItems:"center",
                    height:{xs:"150px",sm:"200px"},position:"relative",overflow:"hidden"
                }}>
                    {trendData.map((item,index)=>{
                        let bannerPos = "100%"
                        let show = "0",display="none"
                        if(index == bannerSelect - 1){
                            bannerPos = "50%"
                            show = "0.5"
                            display="block"
                        }else if(index == bannerSelect){
                            bannerPos = "0"
                            show = "1"
                            display="block"
                        }else if(index == bannerSelect + 1){
                            bannerPos = "-50%"
                            show = "0.5"
                            display="block"
                        }else if(index > bannerSelect - 1){
                            bannerPos = "100%"
                        }else if(index < bannerSelect + 1){
                            bannerPos = "-100%"
                        }
                        return<Box key={item.name} sx={{
                            height:"100%",borderRadius:"20px",overflow:"hidden",
                            opacity:`${show}`,transform:`translateX(${bannerPos})`,
                            zIndex:`${show}`,display:`${display}`,
                            transition:"1s transform ease-in-out",position:"absolute"
                        }} onClick={()=>{
                                if(index == bannerSelect){
                                    console.log("play")
                                }else{
                                    setBannerSelect(index)
                                }
                            }}>
                            <img className={CS.shopCardImage} src={item.picture}></img>
                            <Box width={"100%"} height={"100%"} position={"absolute"} top={"0"} left={"0"} display={"grid"} justifyContent={"center"} alignContent={"center"}>
                                <IconButton><SportsEsports/></IconButton>
                            </Box>
                        </Box>
                    })}
                </Box>
                <Box sx={{...centerCss,display:"flex",flexDirection:"column",gap:"50px"}}>
                    <Grid2 container spacing={2} columns={{sm:2,md:2,lg:3,xl:4}}>
                        {itemData.map((item,index)=>{
                            if(index >= (page-1)*12&&index<page*12){
                                return<Grid2 key={item.name} size={1}>
                                        <GameCard sx={{minWidth:"200px",maxWidth:"500px",height:"auto"}} name={item.name} picture={item.picture}/>
                                    </Grid2>
                                }
                            }
                        )}
                    </Grid2>
                    <Box sx={{display:"flex",justifyContent:"center"}}>
                        <Pagination count={Math.ceil(data.length/12)} page={page} onChange={(_e,value)=>setPage(value)} shape="rounded" />
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default WebGame
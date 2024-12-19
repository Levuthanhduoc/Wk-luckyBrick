import { Box, Button, CircularProgress, Grid2, IconButton, Pagination, Stack } from "@mui/material";
import GameCard from "./gameCard";
import {useEffect, useRef, useState } from "react";

import CS from '../../../assets/css/component.module.css'
import { Gamepad, HelpCenter, SportsEsports } from "@mui/icons-material";
import farm from '../../../assets/image/placeholder/Normal_HeartlakeFarm.jpg'
import race from '../../../assets/image/placeholder/Racetrack_splash.png'
import space from '../../../assets/image/placeholder/planet-hopper.png'
import fetchData from "../../../assets/module/fecthData";
import { JSONContent } from "@tiptap/core";

const apiUrl = import.meta.env.VITE_API_URL
interface defaultData{
    gametitle:string,
    image_uploaded_png:string,
    id:number,
    description:JSONContent,
}


function WebGame(){
    const trendingData = [
        {gametitle:"farm",image_uploaded_png:farm},
        {gametitle:"space",image_uploaded_png:space},
        {gametitle:"race",image_uploaded_png:race}
    ]
    const [page,setPage] = useState(1)
    const [gameBar,setgameBar] = useState(false)
    const [currentCatalog,setCurrentCatalog] = useState("popular")
    // const [isSearch,setSearch] = useState(false)
    const [itemData,setItemData] = useState<defaultData[]|null>()
    const originData = useRef<defaultData[]>()
    const [trendData,_setTrendData] = useState(trendingData)
    const searchB = useRef(null)
    const [bannerSelect,setBannerSelect] = useState(1)
    const centerCss = {
        maxWidth:"1540px",width:"100%",margin:"auto",
        padding:{xs:"45px 5px 70px 5px",sm:"45px 15px 70px 15px",md:"45px 30px 70px 30px",lg:"45px 50px 70px 50px"}, 
    }

    const getData = async ()=>{ 
        if(apiUrl){
            try{
                const result = await fetchData({url:apiUrl +`legos/info?name=games`,
                    methoud:"get"})
                if(result){
                    const rowsData = (result as {[key:string]:unknown}).rows
                    setItemData(rowsData as defaultData[])
                    originData.current = rowsData as defaultData[]
                }
            }catch(error){
                console.log(error)
            }
        }
    }

    const gamebarItems = [
        {id:"popular",gametitle:"Popular",},
        {id:"explore",gametitle:"Explore"},
        {id:"new",gametitle:"New"}
    ]

    const rePos =(condition:boolean):object=>{
        if(condition){
            return {padding:{xs:`0px 5px 10px 5px`,sm:`0px 5px 5px 5px`,md:`64px 25px 5px 25px`}}
        }else{
            return {padding:{xs:`5px 5px 20px 5px`,sm:`5px 5px 20px 5px`,md:`15px 25px 20px 25px`}}
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

    useEffect(()=>{
        document.addEventListener("scroll",onScroll)
        getData()
        return()=>{
            document.removeEventListener("scroll",onScroll)
        }
    },[])
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
                                    {item.gametitle}
                                </Button>
                            </Box>
                            })}
                        </Stack>
                        <IconButton ref={searchB} id="searchButton">
                            <HelpCenter/>
                        </IconButton>
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
                        return<Box key={item.gametitle} sx={{
                            height:"100%",borderRadius:"20px",overflow:"hidden",
                            width:{sx:"90%"},
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
                            <img className={CS.shopCardImage} src={item.image_uploaded_png}></img>
                            <Box width={"100%"} height={"100%"} position={"absolute"} top={"0"} left={"0"} display={"grid"} 
                                justifyContent={"center"} alignContent={"center"}>
                                <IconButton><SportsEsports/></IconButton>
                            </Box>
                        </Box>
                    })}
                </Box>
                {itemData?<Box sx={{...centerCss,display:"flex",flexDirection:"column",gap:"50px"}}>
                    <Grid2 container spacing={2} columns={{sm:2,md:2,lg:3,xl:4}} sx={{width:"100%",justifyContent:"center",alignItems:"center"}}>
                        {itemData.map((item,index)=>{
                            if(index >= (page-1)*12&&index<page*12){
                                return<Grid2 key={item.gametitle} size={1}>
                                        <GameCard sx={{minWidth:"200px",maxWidth:"500px",height:"auto"}} 
                                            id={`${item.id }`} 
                                            name={item.gametitle} 
                                            picture={apiUrl + "storage/" + item.image_uploaded_png}
                                            description={item.description}
                                        />
                                    </Grid2>
                                }
                            }
                        )}
                    </Grid2>
                    <Box sx={{display:"flex",justifyContent:"center"}}>
                        <Pagination count={Math.ceil(itemData.length/12)} page={page} onChange={(_e,value)=>setPage(value)} shape="rounded" />
                    </Box>
                </Box>:<Box sx={{display: 'flex',alignItems: 'center',justifyContent: 'center',}}><CircularProgress size="30px" /></Box>}
            </Box>
        </>
    )
}

export default WebGame
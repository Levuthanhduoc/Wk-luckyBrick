import { Accordion, AccordionDetails, AccordionSummary, Backdrop, Box, Button, Fade, FormControl, Grid2,MenuItem, Pagination, Select,TextField, Typography} from "@mui/material";
import ShopBox from "../../extra/shopCard";
import CS from '../../../assets/css/component.module.css'

import placeHolder from '../../../assets/image/placeholder/placeholder1.webp'
import {Close, Done, ExpandMore, FilterListOutlined} from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Moneyslider } from "./moneySlider";
import { ThemeChecker } from "./themeChecker";

function Shop(){
    const {t} = useTranslation()

    const availabilityOption = [
        {label:"form.inStock",name:"instock",checked:false},
        {label:"form.outStock",name:"outstock",checked:false},
    ]
    const themeOption = [
        {label:"BrickHeadz",name:"brickHeadz",checked:false},
        {label:"City",name:"city",checked:false},
        {label:"Ideals",name:"ideal",checked:false},
        {label:"Technic",name:"technic",checked:false},
        {label:"form.other",name:"other",checked:false},
    ]
    const [filterPos,setFilterPos]= useState(false)
    const [selectSort,setSelectSort] = useState("featured")
    const [searchQuery,setSearchQuery] = useState("")
    const [page,setPage] = useState(1)
    const [backdrop,setBackDrop] = useState(false)
    const [priceRange,setPriceRange] = useState<number|number[]>([25,300])
    const [avalible,setAvalible] = useState(availabilityOption)
    const [theme,setTheme] = useState(themeOption)
    
    const centerCss = {
        maxWidth:"1540px",width:"100%",margin:"auto",
        padding:{sm:"45px 15px 70px 15px",md:"45px 30px 70px 30px",lg:"45px 50px 70px 50px"}, 
    }

    interface itemData {
        id:number|string,
        name:string,
        price:number,
        picture:any,
        sale?:number,
        time?:string,
    }
    const test:itemData[]  = [
    {id: "001", name: "Lego Supercar",picture:placeHolder, price: 100, sale: 25, time: "10/25/2024"},
    {id: "002", name: "Lego Castle Siege",picture:placeHolder, price: 150, sale: 50, time: "11/10/2024"},
    {id: "003", name: "Lego Space Shuttle",picture:placeHolder, price: 200, sale: 35, time: "10/30/2024"},
    {id: "004", name: "Lego Pirate Ship",picture:placeHolder, price: 250, sale: 75, time: "11/5/2024"},
    {id: "005", name: "Lego Dinosaur Attack",picture:placeHolder, price: 90, sale: 60, time: "10/28/2024"},
    {id: "006", name: "Lego Robot Warrior",picture:placeHolder, price: 80, sale: 15, time: "11/15/2024"},
    {id: "007", name: "Lego City Train",picture:placeHolder, price: 130, sale: 20, time: "10/27/2024"},
    {id: "008", name: "Lego Jungle Adventure",picture:placeHolder, price: 110, sale: 40, time: "11/8/2024"},
    {id: "009", name: "Lego Arctic Expedition",picture:placeHolder, price: 140, sale: 30, time: "10/26/2024"},
    {id: "010", name: "Lego Fire Station",picture:placeHolder, price: 75, sale: 85, time: "11/12/2024"},
    {id: "011", name: "Lego Space Colony",picture:placeHolder, price: 180, sale: 70, time: "11/7/2024"},
    {id: "012", name: "Lego Wild West Fort",picture:placeHolder, price: 125, sale: 45, time: "10/24/2024"},
    {id: "013", name: "Lego Police Chase",picture:placeHolder, price: 95, sale: 55, time: "11/1/2024"},
    {id: "014", name: "Lego Mars Mission",picture:placeHolder, price: 160, sale: 65, time: "11/2/2024"},
    {id: "015", name: "Lego Dragon's Lair",picture:placeHolder, price: 170, sale: 20, time: "10/22/2024"},
    {id: "016", name: "Lego Submarine",picture:placeHolder, price: 120, sale: 90, time: "11/4/2024"},
    {id: "017", name: "Lego Safari Jeep",picture:placeHolder, price: 85, sale: 25, time: "11/3/2024"},
    {id: "018", name: "Lego Underwater Base",picture:placeHolder, price: 145, sale: 50, time: "10/21/2024"},
    {id: "019", name: "Lego Space Battle",picture:placeHolder, price: 190, sale: 40, time: "10/29/2024"},
    {id: "020", name: "Lego Medieval Town",picture:placeHolder, price: 105, sale: 60, time: "11/11/2024"},
    {id: "021", name: "Lego Futuristic Racer",picture:placeHolder, price: 115, sale: 35, time: "10/31/2024"},
    {id: "022", name: "Lego Pirate Cove",picture:placeHolder, price: 135, sale: 80, time: "10/23/2024"},
    {id: "023", name: "Lego Sky Lab",picture:placeHolder, price: 200, sale: 15, time: "11/9/2024"},
    {id: "024", name: "Lego Desert Raiders",picture:placeHolder, price: 90, sale: 55, time: "10/20/2024"},
    {id: "025", name: "Lego Aquatic World",picture:placeHolder, price: 160, sale: 45, time: "11/14/2024"},
    {id: "026", name: "Lego Cyber Fortress",picture:placeHolder, price: 140, sale: 65, time: "10/19/2024"},
    {id: "027", name: "Lego Robo Armory",picture:placeHolder, price: 175, sale: 10, time: "11/13/2024"},
    {id: "028", name: "Lego Steampunk City",picture:placeHolder, price: 150, sale: 75, time: "11/6/2024"},
    {id: "029", name: "Lego Mountain Expedition",picture:placeHolder, price: 110, sale: 85, time: "10/18/2024"},
    {id: "030", name: "Lego Volcano Escape",picture:placeHolder, price: 100, sale: 20, time: "11/5/2024"}
    ]

    

    const sortOption = [
        {name:"common.featuredSort",value:"featured"},
        {name:"common.bestSellSort",value:"best"},
        {name:"common.alplabetSortASC",value:"alphaASC"},
        {name:"common.alphabetSortDESC",value:"alphaDES"},
        {name:"common.priceSortASC",value:"priceASC"},
        {name:"common.priceSortDESC",value:"priceDES"},
        {name:"common.dateSortASC",value:"dateASC"},
        {name:"common.dateSortDESC",value:"dateDES"},
    ]



    const filterOption = [
        {name:"common.availability",format:<ThemeChecker items={avalible} setItems={setAvalible}/>},
        {name:"common.price",format:<Moneyslider priceRange={priceRange as number[]} setPriceRange={setPriceRange} min={25} max={300} />},
        {name:"common.theme",format:<ThemeChecker items={theme} setItems={setTheme}/>},
    ]

    const [data,setData] = useState(test)

    const onSearch = (data:itemData[],query:string,section:string)=>{
        const filtered = data.filter((item)=>item[section as "name"].toLowerCase().includes(query.toLowerCase()))
        setPage(1)
        if(query == ""){
            setData(data)
        }else{
            setData(filtered)
        }
    }

    const onScoll = ()=>{ 
        const posNow = window.scrollY;
        if(posNow > 160){
            setFilterPos(true)
        }else {
            setFilterPos(false)
        }
    } 

    useEffect(()=>{
        window.addEventListener("scroll",onScoll)
        return ()=>{
            window.removeEventListener("scroll",onScoll)
        }
    },[])

    return (
        <>
            <Box className = "shop" sx={{display:"flex",flexDirection:"column"}}>
                <Box sx={{
                    backgroundImage:"radial-gradient(circle, rgba(0, 51, 160, 0.3), rgba(0, 31, 63, 0.3))",
                    display:"flex",flexDirection:"column",
                    justifyContent:"center",alignItems:"center",
                    height:"200px",
                }}>
                    <Typography sx={{
                        textAlign:"center",
                        fontSize:"2em",
                        fontWeight:"bolder"
                    }}>
                        {t("common.welcomeBanner")}  
                    </Typography>
                    <Typography sx={{fontSize:"0.9em"}}>{t("common.welcomeSubBanner")}  </Typography>
                </Box>
                <Box sx={{
                    ...centerCss, 
                    display:"flex",flexDirection:"column",gap:"30px"}}
                    >
                        <Box className = {filterPos?CS.fixedBox:""} sx={filterPos?{padding:{xs:"70px 20px 0 20px" ,sm:"70px 40px 0 40px",md:"70px 50px 0 50px"}}:{}}>
                            <Box sx={filterPos?{...centerCss,padding:{sm:"0 15px 0 15px",md:"0 30px 0 30px",lg:"0 50px 0 50px"}, }:{}}>
                                {/* filter bar start */}
                                <Box sx={{display:"flex",justifyContent:"space-between",alignItems:"center",position:"relative"}}>
                                    <Backdrop open={backdrop} sx={(theme) => ({ zIndex: theme.zIndex.drawer + 1 })} 
                                                onClick={(e)=>{
                                        e.stopPropagation()
                                        setBackDrop(false)}}>
                                    </Backdrop>
                                    <Box sx={{backdropFilter:"blur(10px)",width:"100%",height:"100%",position:"absolute"}}></Box>
                                    <Box className={"filterBox"} sx={{position:"relative"}}>
                                        <Button variant="contained" onClick={()=>setBackDrop(true)} endIcon={<FilterListOutlined/>}>
                                            {t("common.filter")}
                                        </Button>
                                        {backdrop&&<Fade in={true}>
                                                <Box sx={theme=>({
                                                        width:{xs:"335px",sm:"500px"},
                                                        height:"500px",
                                                        borderRadius:"5px",overflow:"auto",
                                                        position:"absolute",
                                                        zIndex: theme.zIndex.drawer + 1,
                                                        top:0
                                                    })}
                                                    onClick={(e)=>{e.stopPropagation()}}
                                                    >
                                                    <Box sx={{
                                                        display:"flex",flexDirection:"row",justifyContent:"space-between",alignItems:"center",
                                                        height:"50px",padding:"10px",backgroundColor:"rgb(25, 118, 210)",
                                                        position:"sticky",
                                                        width:"100%",
                                                        zIndex:1,
                                                        top:0,
                                                    }}>
                                                        <Box sx={{display:"flex",flexDirection:"row", gap:"5px"}}>
                                                            <Typography>{t("common.filter").toUpperCase()}</Typography>
                                                            <FilterListOutlined/>
                                                        </Box>
                                                        <Box>
                                                            <Done sx={{cursor:"pointer" ,marginRight:"18px"}} />
                                                            <Close sx={{cursor:"pointer"}} onClick={()=>setBackDrop(false)} />
                                                        </Box>
                                                    </Box>
                                                    <Box sx={{width:"99,9%"}}>
                                                        {filterOption.map((item)=>
                                                            <Accordion key={item.name} style={{margin:"0"}} defaultExpanded>
                                                                <AccordionSummary
                                                                expandIcon={<ExpandMore />}
                                                                aria-controls="filter-content"
                                                                id="filterPrice"
                                                                >
                                                                    {t(item.name)}
                                                                </AccordionSummary>
                                                                <AccordionDetails sx={{margin:"0 16px 0 16px"}}>
                                                                    {item.format}
                                                                </AccordionDetails>
                                                            </Accordion>
                                                        )}
                                                    </Box>
                                                </Box>
                                            </Fade>}
                                    </Box>
                                    <FormControl>
                                        <TextField
                                            sx={{width:{xs:"100px",sm:"20vw"}}}
                                            onChange={(e)=>{
                                                setSearchQuery(e.target.value)
                                                onSearch(test,e.target.value,"name")
                                            }}
                                            value={searchQuery}
                                            id="searchBar"
                                            className="text"
                                            label={t("common.search")}
                                            variant="outlined"
                                            size="small"
                                        />
                                    </FormControl>
                                    <FormControl size="small">
                                        <Select sx={{padding:"0"}} value={selectSort} onChange={(e)=>{setSelectSort(e.target.value)}} id={"sortOption"}>
                                            {sortOption.map((item)=><MenuItem key={item.name} value={item.value}>{t(item.name)}</MenuItem>)}
                                        </Select>
                                    </FormControl>
                                </Box>
                                {/* end filter bar */}
                            </Box>
                        </Box>
                        <Grid2 container spacing={2} columns={{sm:2,md:2,lg:3,xl:4}}>
                            {data.map((item,index)=>{
                                    if(index >= (page-1)*12&&index<page*12){
                                        return<Grid2 key={item.name} size={1}>
                                            <ShopBox sx={{minWidth:"200px",maxWidth:"500px"}}  name={item.name} price={item.price} picture={item.picture} sale={item.sale} timer={item.time}/>
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

export default Shop
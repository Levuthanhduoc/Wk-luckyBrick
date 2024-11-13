import { Accordion, AccordionDetails, AccordionSummary, Backdrop, Box, Button, Fade, FormControl, Grid2,MenuItem, Pagination, Select,TextField, Typography} from "@mui/material";
import ShopBox from "../../extra/shopCard";
import CS from '../../../assets/css/component.module.css'
import {Close, Done, ExpandMore, FilterListOutlined} from "@mui/icons-material";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Moneyslider } from "./moneySlider";
import { ThemeChecker } from "./themeChecker";
import fetchData from "../../../assets/module/fecthData";

const apiUrl = import.meta.env.VITE_API_URL
interface itemData {
    id:number|string,
    name:string,
    price:number,
    image_uploaded_png:string,
    sale?:number,
    timesale?:string,
}
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
    const [itemData,setItemData] =useState<itemData[]>()
    const originData = useRef<itemData[]>()
    
    
    const centerCss = {
        maxWidth:"1540px",width:"100%",margin:"auto",
        padding:{sm:"45px 15px 70px 15px",md:"45px 30px 70px 30px",lg:"45px 50px 70px 50px"}, 
    }
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
    const onSearch = (data:itemData[],query:string,section:string)=>{
        const filtered = data.filter((item)=>item[section as "name"].toLowerCase().includes(query.toLowerCase()))
        setPage(1)
        if(query == ""){
            setItemData(data)
        }else{
            setItemData(filtered)
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
    
   
    const getData = async ()=>{ 
        if(apiUrl){
            try {
                const result = await fetchData({url:apiUrl +`legos/info?name=legos`,
                    methoud:"get"})
                if(result){
                    const rowsData = (result as {[key:string]:unknown}).rows
                    setItemData(rowsData as itemData[])
                    originData.current = rowsData as itemData[]
                }
            } catch (error) {
                console.log(error)
            }
        }
    }


    useEffect(()=>{
        getData()
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
                {itemData&&<Box sx={{
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
                                                onSearch(originData.current||[],e.target.value,"name")
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
                            {itemData&&itemData.map((item,index)=>{
                                    if(index >= (page-1)*12&&index<page*12){
                                        return<Grid2 key={item.name} size={1}>
                                            <ShopBox sx={{minWidth:"200px",maxWidth:"500px"}} id={`${item.id}`}  name={item.name} price={item.price} picture={apiUrl+"storage/"+item.image_uploaded_png[0]} sale={(item.sale||1 )* 100} timer={item.timesale}/>
                                        </Grid2>
                                    }
                                }
                            )}
                        </Grid2>
                        <Box sx={{display:"flex",justifyContent:"center"}}>
                            <Pagination count={Math.ceil(itemData.length/12)} page={page} onChange={(_e,value)=>setPage(value)} shape="rounded" />
                        </Box>
                    </Box>}
                </Box>
        </>
    )
}

export default Shop
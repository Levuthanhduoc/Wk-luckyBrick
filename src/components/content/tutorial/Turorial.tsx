import { Box, CircularProgress, Grid2, Pagination, Typography } from "@mui/material";
import GuideCard from "./guideCard";
import { useTranslation } from "react-i18next";
import CutBar from "../../extra/cutBar";

import { useEffect, useRef, useState } from "react";
import { LocalFireDepartment, NewReleases, Shuffle, TipsAndUpdates } from "@mui/icons-material";
import fetchData from "../../../assets/module/fecthData";
interface defaultData{
    id:number
    name:string,
    serial:string,
    image_uploaded_png:string
}
const apiUrl = import.meta.env.VITE_API_URL
function Tutorial(){
    const {t} = useTranslation()
    const [page,setPage] = useState(1)
    const [itemData,setItemData] = useState<defaultData[]>()
    const originData = useRef<defaultData[]>()
    const centerCss = {
        maxWidth:"1540px",width:"100%",margin:"auto",
        padding:{sm:"45px 15px 70px 15px",md:"45px 30px 70px 30px",lg:"45px 50px 70px 50px"}, 
    }
    const barItems = [
        {name:"Hosttest",icon:<LocalFireDepartment/>,onClick:()=>{}},
        {name:"Newset",icon:<NewReleases/>,onClick:()=>{}},
        {name:"Featured",icon:<TipsAndUpdates/>,onClick:()=>{}},
        {name:"random",icon:<Shuffle/>,onClick:()=>{}}
    ]

    const getData = async ()=>{ 
        if(apiUrl){
            try {
                const result = await fetchData({url:apiUrl +`legos/info?name=tutorials`,
                    methoud:"get"})
                if(result){
                    const rowsData = (result as {[key:string]:unknown}).rows
                    setItemData(rowsData as defaultData[])
                    originData.current = rowsData as defaultData[]
                }
            } catch (error) {
                console.log(error)
            }
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
        getData()
    },[])
    return (
        <>
             <Box sx={{
                    backgroundImage:"radial-gradient(circle, rgba(0, 51, 160, 0.3), rgba(0, 31, 63, 0.3))",
                    display:"flex",flexDirection:"column",
                    justifyContent:"center",alignItems:"center",
                    height:"200px",
                    margin:{xs:"40px 0px 0px 0px",sm:"25px 0px 0px 0px",md:"15px 0px 0px 0px"}
                }}>
                    <Typography sx={{
                        textAlign:"center",
                        fontSize:"2em",
                        fontWeight:"bolder"
                    }}>
                        {t("common.tutorialBanner")}  
                    </Typography>
                    <Typography sx={{fontSize:"0.9em"}}>{t("common.tutorialSubBanner")}  </Typography>
                </Box>
            {itemData?<Box sx={{...centerCss,display:"flex",flexDirection:"column",gap:"30px",justifyContent:"center",alignItems:"center"}}>
                <CutBar items={barItems} sx={{height:"40px",width:"100%"}} onSearch={(query:string)=>onSearch(originData.current||[],query,"name")}/>
                <Grid2 container spacing={2} columns={{sm:2,md:2,lg:3,xl:4}}>
                    {itemData.map((item,index)=>{
                            if(index >= (page-1)*12&&index<page*12){
                                return<Grid2 key={item.name} size={1}>
                                    <GuideCard sx={{minWidth:"200px",maxWidth:"500px"}} items={{...item,picture:apiUrl+"storage/"+item.image_uploaded_png}}/>
                                </Grid2>
                            }
                        }
                    )}
                </Grid2>
                <Box sx={{display:"flex",justifyContent:"center"}}>
                    <Pagination count={Math.ceil(itemData.length/12)} page={page} onChange={(_e,value)=>setPage(value)} shape="rounded" />
                </Box>
            </Box>:<Box sx={{display: 'flex',alignItems: 'center',justifyContent: 'center',}}><CircularProgress size="30px" /></Box>}
        </>
    )
}

export default Tutorial
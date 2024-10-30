import { Box, Grid2, Pagination, Typography } from "@mui/material";
import GuideCard from "./guideCard";
import { useTranslation } from "react-i18next";
import CutBar from "../../extra/cutBar";

import placeHolder2 from '../../../assets/image/placeholder/placeholder2.png'
import { useEffect, useState } from "react";
import { LocalFireDepartment, NewReleases, Shuffle, TipsAndUpdates } from "@mui/icons-material";
import fetchData from "../../../assets/module/fecthData";
interface defaultData{
    id:number
    name:string,
    serial:string,
    picture:string
}
const tutorialApiUrl = import.meta.env.VITE_TUTORIAL_API
const apiUrl = import.meta.env.VITE_API_URL
function Tutorial(){
    const testData = [
        {id:0,name:"test1",serial:"0000000",picture:placeHolder2},
        {id:1,name:"test2",serial:"0000000",picture:placeHolder2},
        {id:2,name:"test3",serial:"0000000",picture:placeHolder2},
        {id:3,name:"test4",serial:"0000000",picture:placeHolder2},
        {id:4,name:"test5",serial:"0000000",picture:placeHolder2},
        {id:5,name:"test6",serial:"0000000",picture:placeHolder2},
        {id:6,name:"test7",serial:"0000000",picture:placeHolder2},
        {id:7,name:"test8",serial:"0000000",picture:placeHolder2},
        {id:8,name:"test9",serial:"0000000",picture:placeHolder2},
        {id:9,name:"test10",serial:"0000000",picture:placeHolder2},
        {id:10,name:"test11",serial:"0000000",picture:placeHolder2},
        {id:11,name:"test12",serial:"0000000",picture:placeHolder2},
        {id:12,name:"test13",serial:"0000000",picture:placeHolder2},
        {id:13,name:"test14",serial:"0000000",picture:placeHolder2},
        {id:14,name:"test15",serial:"0000000",picture:placeHolder2},
        {id:15,name:"test16",serial:"0000000",picture:placeHolder2}
    ]
    const {t} = useTranslation()
    const [page,setPage] = useState(1)
    const [itemData,setItemData] = useState(testData)
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
            const result = await fetchData({url:tutorialApiUrl,methoud:"get"})
            if(result){
                setItemData(result as defaultData[])
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
    })
    return (
        <>
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
                        {t("common.tutorialBanner")}  
                    </Typography>
                    <Typography sx={{fontSize:"0.9em"}}>{t("common.tutorialSubBanner")}  </Typography>
                </Box>
            <Box sx={{...centerCss,display:"flex",flexDirection:"column",gap:"30px"}}>
                <CutBar items={barItems} sx={{height:"40px",width:"100%"}} onSearch={(query:string)=>onSearch(testData,query,"name")}/>
                <Grid2 container spacing={2} columns={{sm:2,md:2,lg:3,xl:4}}>
                    {itemData.map((item,index)=>{
                            if(index >= (page-1)*12&&index<page*12){
                                return<Grid2 key={item.name} size={1}>
                                    <GuideCard sx={{minWidth:"200px",maxWidth:"500px"}} items={{...item,picture:apiUrl+item.picture}}/>
                                </Grid2>
                            }
                        }
                    )}
                </Grid2>
                <Box sx={{display:"flex",justifyContent:"center"}}>
                    <Pagination count={Math.ceil(testData.length/12)} page={page} onChange={(_e,value)=>setPage(value)} shape="rounded" />
                </Box>
            </Box>
        </>
    )
}

export default Tutorial
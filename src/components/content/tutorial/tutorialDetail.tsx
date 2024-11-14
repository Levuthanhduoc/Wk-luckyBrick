import { Box, Divider, Fade, SxProps, Tab, Tabs} from "@mui/material"
import Breakcrumb from "../../extra/breadcrumb"
import { SyntheticEvent, useEffect, useState } from "react"
import fetchData from "../../../assets/module/fecthData"
import { useParams } from "react-router-dom"

interface TabContentProps {
    children?: React.ReactNode,
    index: number,
    value: number,
    sx?:SxProps,
}

interface defaultData{
    id:number
    name:string,
    serial:string,
    image_uploaded_png:string,
    tutorialfile_uploaded_pdf:string[],
}

const centerCss = {
    maxWidth:"1540px",width:"100%",margin:"auto",
    padding:{xs:"25px 0 0 0",sm:"45px 15px 70px 15px",md:"45px 30px 70px 30px",lg:"45px 50px 70px 50px"}, 
}

const apiUrl = import.meta.env.VITE_API_URL

const TabContent = (props:TabContentProps)=>{
    return(
        <Fade in={props.value == props.index} mountOnEnter unmountOnExit timeout={2000}>
            <Box role="tabpanel"
                hidden={props.value != props.index}
                id={`simple-tabpanel-${props.index}`}
                aria-labelledby={`simple-tab-${props.index}`}
                sx={{...props.sx,zIndex:"-1"}}> 
                {props.children}
            </Box>
        </Fade>
    )
}



function TutorialDetail(){
    const [tab,settab] = useState(0)
    const [itemData,setItemData] = useState<defaultData>()
    const {id}=useParams()
    // const tabItems = [
    //     {id:"tab-0",name:"Book 1"},
    //     {id:"tab-1",name:"Book 2"},
    //     {id:"tab-2",name:"Botutorialfile_uploaded_pdfok 3"},
    // ]
    const getData = async ()=>{ 
        if(apiUrl){
            try {
                const result = await fetchData({url:apiUrl +`legos/info?name=tutorials&id=${id}`,
                    methoud:"get"})
                if(result){
                    const rowsData = (result as {[key:string]:defaultData[]}).rows
                    setItemData(rowsData[0] as defaultData)
                }
            } catch (error) {
                console.log(error)
            }
        }
    }
    useEffect(()=>{
        getData()
    },[])

    return (
        <>
            <Box sx={centerCss}>
                <Breakcrumb sx={{width:"100%",margin:"auto",padding:"30px 0 30px 0"}}/>
                <Box sx={{border: "1px solid rgba(255, 255, 255, 0.12)",margin:"0 0 30px 0",padding:{xs:"0",sm:"0 35px 0 35px "},borderRadius:"5px"}}>
                    <Tabs value={tab} onChange={(_e:SyntheticEvent,value)=>settab(value)}  variant="scrollable" scrollButtons="auto" allowScrollButtonsMobile>
                        {itemData&&itemData.tutorialfile_uploaded_pdf?.map((_item,index)=><Tab sx={{fontWeight:"bold"}} key={index} label={`Book ${index +1}`} aria-controls= {`simple-tabpanel-${index}`} />)}
                    </Tabs>
                    <Divider orientation="horizontal" flexItem />
                    <Box sx={{padding:"35px 0 35px 0"}}>
                        {itemData&&itemData.tutorialfile_uploaded_pdf?.map((item,index)=>
                            <TabContent key={index}  value={tab} index={index}>
                                <iframe src={apiUrl+"storage/"+item} width={"100%"} height={"600px"}></iframe>
                            </TabContent>
                        )}
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default TutorialDetail
import { Box} from "@mui/material";
import AdBanner from "../../extra/adBanner";
import ShowCaseBox from "./showCaseBox";
import SelectionBox from "./selectionBox";
import LegoMOC from "./legoMOC";
import {section,theme,mocItems} from './homeItem'
import LocationBox from "./locationBox";

function Home(){
    
    return (
        <>
            <Box className = "home" sx={{display:"flex",flexDirection:"column",marginTop:{md:"20px"},
            }}>
                <Box sx={{
                    backgroundImage:"radial-gradient(circle, rgba(0, 51, 160, 0.3), rgba(0, 31, 63, 0.3))",
                    display:"flex",flexDirection:"column",
                    justifyContent:"center",alignItems:"center"
                }}>
                    <AdBanner/>
                </Box>
                <Box>
                    {section.map((item,index)=>
                        <ShowCaseBox key={index} title={item.tittle} section={item.section}/>
                    )}
                    <SelectionBox title="Shop By Theme" items={theme}  />
                </Box>
                <Box>
                    <LegoMOC item={mocItems}/>
                </Box>
                <LocationBox/>
            </Box>
        </>
    )
}

export default Home
import { Check } from "@mui/icons-material";
import { Grow, Stack } from "@mui/material";

export default function AlertPopup(props:{type:"success"|"error",message:string}){  
    const alertStyle = {
        error:{backgroundColor: "#f8d7da",color: "#721c24",border: "1px solid #f5c6cb"},
        success:{backgroundColor: "#d4edda",color: "#155724",border: "1px solid #c3e6cb"}
    }

    return(
      <Grow in={true} timeout={2000}>
          <Stack sx={{ 
          ...alertStyle[props.type],
          padding: "10px",
          borderRadius: "5px"}} direction={"row"} alignItems={"center"} gap={"10px"}>
          <Check/>
          {props.message}
          </Stack>
      </Grow>
    )
  }
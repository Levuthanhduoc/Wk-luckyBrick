import { Breadcrumbs, SxProps, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import upperCaseFirstLetter from "../../assets/module/upperCaseFirstletter";

interface items{
    name:string,
    path:string,
}

interface props{
    items:items[],
    sx:SxProps
}

function Breakcrumb (props:props){

    return(
        <Breadcrumbs sx={props.sx} separator=">"  aria-label="breadcrumb">
            {props.items.map((item,index)=>{
                const itemLenght = props.items.length
                if(index == itemLenght - 1){
                    return <Typography key={index} sx={{ color: 'text.primary' }}>{item.name}</Typography>
                }else{
                    return <Link key={index} style={{ color: 'inherit', textDecoration: 'none',cursor: 'pointer'}} to={item.path}>
                            {upperCaseFirstLetter(item.name)}
                    </Link>
                }
            })}
        </Breadcrumbs>
    )
}

export default Breakcrumb
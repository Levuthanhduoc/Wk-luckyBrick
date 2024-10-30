import { Breadcrumbs, SxProps, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import upperCaseFirstLetter from "../../assets/module/upperCaseFirstletter";
import { useEffect, useState } from "react";

interface items{
    name:string,
    path:string,
}

interface props{
    sx?:SxProps
}

function Breakcrumb (props:props){
    const [breadCrumb,setbreadCrumb] = useState<null|items[]>(null)

    const setNewbreadCrumb = ()=>{
        const current = window.location.pathname
        let newBreadcrumb:items[]=[]
        if(current){
            const allpath = current.split("/")
            if(allpath.length >1){
                let merge ="" 
                for(const path of allpath){
                    merge = merge + path + "/"
                    if(path != ""){
                        newBreadcrumb.push({
                            name:path,
                            path:merge
                        })
                    }
                }
            }else{
                newBreadcrumb = [{
                    name:"",
                    path:""
                }]
            }
            setbreadCrumb(newBreadcrumb)
        }
    }
    useEffect(()=>{
        setNewbreadCrumb()
    },[])
    return(
        <>
            <Breadcrumbs sx={props.sx} separator=">"  aria-label="breadcrumb">
                {breadCrumb&&breadCrumb.map((item,index)=>{
                    const itemLenght = breadCrumb.length
                    if(index == itemLenght - 1){
                        return <Typography key={index} sx={{ color: 'text.primary' }}>{item.name}</Typography>
                    }else{
                        return <Link key={index} style={{ color: 'inherit', textDecoration: 'none',cursor: 'pointer'}} to={item.path}>
                                {upperCaseFirstLetter(item.name)}
                        </Link>
                    }
                })}
            </Breadcrumbs>
        </>
    )
}

export default Breakcrumb
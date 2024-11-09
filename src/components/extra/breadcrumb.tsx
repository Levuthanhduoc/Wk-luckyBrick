import { Breadcrumbs, SxProps, Typography } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import upperCaseFirstLetter from "../../assets/module/upperCaseFirstletter";
import { useEffect, useState } from "react";
import { NavigateNextRounded } from "@mui/icons-material";

interface items{
    name:string,
    path:string,
}

interface edit{
    current:string,
    edited:string,
}

interface props{
    sx?:SxProps
    edit?:edit[]
}

function Breakcrumb (props:props){
    const [breadCrumb,setbreadCrumb] = useState<null|items[]>(null)
    const location = useLocation()

    const setNewbreadCrumb = ()=>{
        const current = location.pathname
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
    },[location])
    return(
        <>
            <Breadcrumbs sx={props.sx} separator={<NavigateNextRounded fontSize="small" />}  aria-label="breadcrumb">
                {breadCrumb&&breadCrumb.map((item,index)=>{
                    let itemName = item.name
                    if(props.edit){
                        for(const i of props.edit){
                            if(item.name == i.current){
                                itemName = i.edited
                            }
                        }
                    }
                    const itemLenght = breadCrumb.length
                    const uppercaseName = upperCaseFirstLetter(itemName)
                    if(index == itemLenght - 1){
                        return <Typography key={index} sx={{ color: 'text.primary', fontWeight: 600 }}>{uppercaseName}</Typography>
                    }else{
                        return <Link key={index} style={{ color: 'inherit', textDecoration: 'none',cursor: 'pointer'}} to={item.path}>
                                {uppercaseName}
                        </Link>
                    }
                })}
            </Breadcrumbs>
        </>
    )
}

export default Breakcrumb
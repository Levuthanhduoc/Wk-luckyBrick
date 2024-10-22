import { FormControl, InputBase, TextField } from "@mui/material"
import React, { useState } from "react"
import { useTranslation } from "react-i18next"

interface props{
    onSearch:any,
    sx?:Object,
}

const SearchBar= React.forwardRef((props:props,ref)=>{
    const [searchQuery,setSearchQuery] = useState("")
    const {t} = useTranslation()
    return(
            <InputBase ref={ref}
                sx={props.sx?props.sx:{width:{xs:"100px",sm:"20vw"}}}
                onChange={(e)=>{
                    setSearchQuery(e.target.value)
                    props.onSearch(e.target.value)
                }}
                value={searchQuery}
                id="searchBar"
                className="text"
                placeholder={t("common.search")}  
            />
    )
})

export default SearchBar
import { Box, Button, Stack, SxProps, Typography } from "@mui/material";
import React, { memo, ReactElement, ReactNode, useContext, useEffect, useState } from "react";
import { apiResponseInterface, contextInterface } from "../../../../../AppTyscript";
import { Context } from "../../../../base/ContextWarper";
import SelectForm from "../../../../extra/selectForm";
import TextForm from "../../../../extra/textForm";
import NumberForm from "../../../../extra/numberForm";
import DateForm from "../../../../extra/dateForm";
import BooleanForm from "../../../../extra/boolenForm";
import { Publish } from "@mui/icons-material";
import {RichTextForm} from "../../../../extra/richTextForm";
import UploadForm from "../../../../extra/uploadForm";

interface propsType{
    sx?:SxProps,
    children?:ReactNode,
    tableName:string
}

const selectColum:{[key:string]:unknown} = {
  role:["admin","user"],
  status:['active', 'inactive', 'pending', 'suppress']
}

const apiUrl = import.meta.env.VITE_API_URL

export default memo(function AddFrom(props:propsType){
    const {setSnack} = useContext(Context) as contextInterface
    const [responseErrorMesssage,setResponseErrorMesssage] = useState<string[]>()
    const [content,setContent] = useState<ReactElement|null>(null)

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        let messageText:string[] = [] 
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        try {
          const result = await fetch( apiUrl + 'query/add?tableName=' + props.tableName, {
            method: 'POST',
            body: data,
            credentials: 'include',
          })
          if (result.ok) {
            const resData = await result.json() as apiResponseInterface
            if (resData.status) {
              return
            } else {
              messageText = [...messageText, ...resData.data.message]
            }
          }
        } catch (err) {
          let errText = ""
          if (typeof err === "string") {
            errText = err.toUpperCase()
          } else if (err instanceof Error) {
            errText = err.message 
          }
          messageText.push(errText)
        }
          
        if(messageText.length > 0){
          setResponseErrorMesssage(messageText)
        }
    };

    const getTableInfo = async ()=>{
      const newForm = []
        try {
            const result = await fetch( apiUrl + 'query/info?tableName=' + props.tableName, {
              method: 'GET',
              credentials: 'include',
            })
            if (result.ok) {
              const resData = await result.json() as apiResponseInterface
              if (resData.status) {
                const columnName = resData.data.columnName
                const columnType = resData.data.columnType
                let index = -1
                for(const i of columnName){
                  index = index + 1
                  const currentType = columnType[index]
                  if(selectColum[i]){
                    newForm.push(<SelectForm name={i} value={selectColum[i] as string[] }/>)
                  }else if(currentType == "string"){
                    newForm.push(<TextForm name={i}/>)
                  }else if(currentType == "number"){
                    newForm.push(<NumberForm name={i}/>)
                  }else if(currentType == "time"){
                    newForm.push(<DateForm name={i}/>)
                  }else if(currentType == "boolean"){
                    newForm.push(<BooleanForm name={i}/>)
                  }
                }

                return
              } else {
                setSnack({isOpen:true,message:resData.data.message[0]})
              }
            }
          } catch (err) {
            let errText = ""
            if (typeof err === "string") {
              errText = err.toUpperCase()
            } else if (err instanceof Error) {
                errText = err.message 
            }
            setSnack({isOpen:true,message:errText}) 
          }
    }
    useEffect(()=>{
        // getTableInfo()
    },[])

    return(
      <>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{
              overflow:"auto",
              display: 'flex',
              height:"90vh",
              flexDirection: 'column',
              width: '500px',
              gap: 2,
              // backgroundImage: `radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))`,
              backgroundColor:"#2f3640",
              padding:"20px",
              borderRadius:"25px"
            }}
          >
            <Typography sx={{fontSize: "1.5rem",fontWeight: "bold", textAlign: "center"}} >Add new row to {props.tableName}</Typography>
            {props.children}
            {content||""}
            <Stack direction="column">
              <SelectForm name={"a"} value={selectColum["role"] as string[] }/>
              <TextForm name={"b"}/>
              <NumberForm name={"c"}/>
              <BooleanForm name={"d"}/>
              <DateForm name="r"/>
              <RichTextForm name={"e"}/>
              <UploadForm name="f"/>
              <Button>SUBMIT <Publish/></Button>
            </Stack>
          </Box>
        </>
    )
})
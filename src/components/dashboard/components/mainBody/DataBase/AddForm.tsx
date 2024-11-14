import { Box, Button, CircularProgress, Stack, SxProps, Typography } from "@mui/material";
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
import { v4 as uuidv4 } from 'uuid';

interface propsType{
    sx?:SxProps,
    children?:ReactNode,
    tableName:string
    onSubmit?:()=>void
    update?:string
}

const selectColum:{[key:string]:unknown} = {
  role:["admin","user"],
  status:['active', 'inactive', 'pending', 'suppress']
}

const apiUrl = import.meta.env.VITE_API_URL

export default memo(function AddFrom(props:propsType){
    const {setSnack} = useContext(Context) as contextInterface
    const [responseErrorMesssage,setResponseErrorMesssage] = useState<string[]>()
    const [content,setContent] = useState<ReactElement[]|null>(null)
    const [loadding,setLoading] = useState(false)

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        let messageText:string[] = [] 
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        try {
          let result
          if(props.update){
            result = await fetch( apiUrl + `query/update?tableName=${props.tableName}&id=${props.update}` , {
              method: 'PUT',
              body: data,
              credentials: 'include',
            })
          }else{
            result = await fetch( apiUrl + 'query/add?tableName=' + props.tableName, {
              method: 'POST',
              body: data,
              credentials: 'include',
            })
          }
          if (result.ok) {
            const resData = await result.json() as apiResponseInterface
            if (resData.status) {
              setSnack({isOpen:true,message:resData.data.message[0]})
              props.onSubmit?props.onSubmit():""
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
        setLoading(false)
    };

  const getTableInfo = async ()=>{
    const newForm = []
    let newRowsValue:{[key:string]:unknown} = {}
    try {
        const result = await fetch( apiUrl + 'query/tableInfo?tableName=' + props.tableName, {
          method: 'GET',
          credentials: 'include',
        })
        //update
        if(props.update != null){
          const rowFetch = await fetch( apiUrl + `query/rowInfo?tableName=${props.tableName}&id=${props.update}`, {
            method: 'GET',
            credentials: 'include',
          })
          if(rowFetch.ok){
            const rowData = await rowFetch.json() as apiResponseInterface
            if(rowData.status){
              newRowsValue = rowData.data.rows as {} 
            }else{
              throw new Error(rowData.data.message[0]);
              
            }
          }
        }
        if (result.ok) {
          const resData = await result.json() as apiResponseInterface
          if(resData.status) {
            const columnName = resData.data.columnName
            const columnType = resData.data.columnType
            let index = -1
            for(const i of columnName){
              index = index + 1
              const currentType = columnType[index]
              const key = uuidv4()
              const uploadType = ["pdf","png","zip"]
              if(selectColum[i]){
                newForm.push(<SelectForm key={key} name={i} value={newRowsValue[i]} selectValue={selectColum[i] as string[] }/>)
              }else if(currentType == "string"){
                newForm.push(<TextForm key={key} value={newRowsValue[i] as string} name={i}/>)
              }else if(currentType == "number"){
                newForm.push(<NumberForm key={key} value={newRowsValue[i] as string} name={i}/>)
              }else if(currentType == "time"){
                newForm.push(<DateForm key={key} value={newRowsValue[i] as string} name={i}/>)
              }else if(currentType == "boolean"){
                newForm.push(<BooleanForm key={key} value={newRowsValue[i] as boolean} name={i}/>)
              }else if(currentType == "json"){
                newForm.push(<RichTextForm key={key} name={i} value={newRowsValue[i] as string}/>)
              }else if(uploadType.includes(currentType)){
                newForm.push(<UploadForm key={key} name={i} value={newRowsValue[i] as string[]} type={currentType}/>)
              }
            }
            setContent(newForm)
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
      getTableInfo()
    },[])

    return(
      <>
          <Box
            component="form"
            onSubmit={(e)=>{handleSubmit(e);setLoading(true);setResponseErrorMesssage(undefined)}}
            noValidate
            sx={{
              overflow:"auto",
              display: 'flex',
              height:"80vh",
              flexDirection: 'column',
              width: {xs:"100%",sm:'500px'},
              gap: 2,
              // backgroundImage: `radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))`,
              backgroundColor:"#2f3640",
              scrollbarWidth:"none",
              padding:"20px",
              borderRadius:"25px"
            }}
          >
            <Typography sx={{fontSize: "1.5rem",fontWeight: "bold", textAlign: "center"}} >
              {props.update?`Update row id:${props.update} of `:"Add new row to "}{props.tableName}
            </Typography>
            {props.children}
            <Stack direction="column" flex={1}>
              {content||<CircularProgress size="3rem"/>}
              {/* <TextForm name={"a"}/>
              <NumberForm name={"b"}/>
              <DateForm name={"c"}/>
              <BooleanForm name={"d"}/>
              <RichTextForm name={"e"}/>
              <UploadForm name={"f"}/>
              <SelectForm name={"g"} value={selectColum[0] as string[] }/> */}
            </Stack>
              {responseErrorMesssage&&<Box sx={{color:"#ff4d4d"}}>
                {responseErrorMesssage.map((message,index)=><Typography key={index}>{message}</Typography>)}
              </Box>}
            {content&&!loadding?<Button type="submit">SUBMIT <Publish/></Button>:<CircularProgress size={10}/>}
          </Box>
        </>
    )
})
import { CloudUpload, HourglassTop, PlayArrow, PlayDisabled, QuestionMark } from "@mui/icons-material"
import { Box, Button, Divider, IconButton, LinearProgress, Stack, Typography } from "@mui/material"
import { ChangeEvent, useContext, useEffect, useState } from "react"
import { apiResponseInterface, contextInterface } from "../../../../../AppTyscript"
import { Context } from "../../../../base/ContextWarper"
import { getJson } from "../../../../extra/richTextForm"
import AlertPopup from "../../../../extra/alertPopup"

const apiUrl = import.meta.env.VITE_API_URL

export default function FastAddForm(props:{tableName:string,onSubmit?:()=>void}){
    const [ready,setReady] = useState<"prepare"|"ready"|"go">("prepare")
    const [statusMessage,setStatusMessage] = useState<{status:"success"|"error",message:string}[]>()
    const [colInfo,setColInfo] = useState<{name:string[],type:string[]}|null>(null)
    const [loading,setLoading] = useState(true)
    const {setSnack} = useContext(Context) as contextInterface

    const validatting = (e:ChangeEvent<HTMLInputElement>)=>{
        const files = Array.from(e.target.files||[])
        if(files[0].type == "application/json"){
            setReady("ready")
        }
    }

    const AddToDataBase = async (file:{[key:string]:unknown}) =>{
        setReady("go")
        if(!file.data && !colInfo){
            return
        }
        const JsonData = file.data
        const report = statusMessage?[...statusMessage]:[]
        let dataIndex = -1
        for(let item of JsonData as []){
            dataIndex = dataIndex + 1
            const formData = new FormData
            let index = -1
            let isFail = false
            for(let key of colInfo?.name as string[]){
                index = index + 1;
                const isUploadType = key.match("_uploaded_")
                const isJsonType = colInfo?.type[index] == "json"
                if(!item[key]){
                    report.push({status:"error",
                        message:`Fail to add item #${dataIndex} to Database, property "${key}" is empty`
                    })
                    setStatusMessage(report)
                    isFail = true
                    continue
                }else if(isUploadType){
                    for(let url of item[key] as string[]){
                        try {
                            const response = await fetch(url);
                            const data = await response.blob();
                            const splitUrl = url.split("/")
                            const filename = splitUrl[splitUrl.length -1]
                            const content = new File([data], filename, {
                                type: data.type || 'image/jpeg',
                            });
                            formData.append(key,content,filename)
                        } catch (error) {
                            report.push({status:"error",
                                message:`Fail to add item #${dataIndex} to Database, Cause: fail to load url: ${url}`
                            })
                            setStatusMessage(report)
                            isFail = true
                            continue
                        }
                    }
                }else if(isJsonType){
                    const htmlToJson = getJson(item[key])
                    formData.append(key,JSON.stringify(htmlToJson))
                } else{
                    formData.append(key,item[key])
                }
            }
            if(!isFail){
                try {
                    const result = await fetch( apiUrl + 'query/add?tableName=' + props.tableName, {
                        method: 'POST',
                        body: formData,
                        credentials: 'include',
                    })
                    if (result.ok) {
                        const resData = await result.json() as apiResponseInterface
                        report.push({status:resData.status?"success":"error",message:`item #${dataIndex}, ${resData.data.message[0]}`})
                        setStatusMessage(report)
                    }
                } catch (error) {
                    report.push({status:"error",message:`Fail to add ${item["name"]} to Database`})
                    setStatusMessage(report)
                }
            }
        }
        setReady("prepare") 
    }

    const onSubmit= async (e:React.FormEvent<HTMLFormElement>)=>{
      e.preventDefault()
      if(ready != "ready"){
        return
      }
      const formData = new FormData(e.currentTarget)
      const reader = new FileReader()
      const jsonFile = formData.get("fastAdd")
      if(!jsonFile){
        return
      }
      reader.onload = (e)=>AddToDataBase(JSON.parse(e.target?.result as string))
      reader.readAsText(jsonFile as Blob)
    }

    const fecthtable = async ()=>{
        try{
            const result = await fetch( apiUrl + 'query/tableInfo?tableName=' + props.tableName, {
                method: 'GET',
                credentials: 'include',
            })
            if (result.ok) {
                const resData = await result.json() as apiResponseInterface
                if(resData.status) {
                    setColInfo({
                        name:resData.data.columnName,
                        type:resData.data.columnType,
                    })
                    setLoading(false)
                    return
                }                    
            }
            setSnack({isOpen:true,message:"Server error please try again"})
        }catch(error){
            setSnack({isOpen:true,message:"Network error please try again"})
        }
    }
    useEffect(()=>{
        fecthtable()
    },[])
    return(
        <Box component={"form"} noValidate
          sx={{
            overflow:"auto",
            display: 'flex',
            height:"80vh",
            flexDirection: 'column',
            width: {xs:"100%",sm:'500px'},
            gap: 2,
            backgroundColor:"#2f3640",
            scrollbarWidth:"none",
            padding:"20px",
            borderRadius:"25px",
            position:"relative"
        }}
          onSubmit={onSubmit}
        >
            <Stack position={"relative"}>
                <Typography lineHeight={1.5} fontSize={"1.5rem"}>Fast Add</Typography>
            </Stack>
            {loading?<LinearProgress/>:
            <><Divider/>
            <Box>
              <Stack direction={"row"} alignItems={"center"}>
                <Button
                    id={"addFile"}
                    component="label"
                    role={undefined}
                    variant="contained"
                    tabIndex={-1}
                    startIcon={<CloudUpload />}
                    >
                    Submit file
                    <input style={{display:"none"}} type="file" id={"FastAdd"} 
                        onChange={(e)=>{validatting(e)}} name={"fastAdd"}
                        accept={"application/JSON"}
                    ></input>
                </Button>
                <IconButton><QuestionMark/></IconButton>
                <IconButton type="submit" onClick={()=>setStatusMessage(undefined)}>{
                    ready=="prepare"?<PlayDisabled/>:
                    (ready=="ready"?<PlayArrow/>:<HourglassTop/>)
                }</IconButton>
              </Stack>
            </Box>
            {ready=="go"?<LinearProgress/>:<Divider/>}
            <Stack>
                {statusMessage&&statusMessage.map((item,index)=>
                    <AlertPopup key={index} type={item.status} message={item.message}/>
                )}
            </Stack>
            </>}
        </Box>
    )
  }


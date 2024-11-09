import { Send } from "@mui/icons-material";
import { Box, Button,CircularProgress,FormControl, Stack, TextField, Typography } from "@mui/material";
import { FormEvent, ReactElement, useContext, useEffect, useRef, useState } from "react";
import { apiResponseInterface, contextInterface } from "../../../../../AppTyscript";
import { Context } from "../../../../base/ContextWarper";
import DataTable from "../../../../extra/DataTable";
import { v4 as uuidv4 } from 'uuid'

const apiUrl = import.meta.env.VITE_API_URL

export default function DataQuery(){
    const sentMessageStyle ={ backgroundColor:"#5C6BC0",margin:"10px 0 10px 0",alignSelf:"end"}
    const receivedMessageStyle= {backgroundColor:"#B0BEC5",alignSelf:"start"}
    const messageBoxStyle = {padding:"5px 15px 5px 15px",maxWidth:"80%",wordWrap:"break-word", borderRadius:"15px"}
    const {setSnack}=useContext(Context) as contextInterface
    const [messageStack,setMessageStack] = useState<ReactElement[]>([])
    const [loading,setloading]= useState(false)
    const archorRef = useRef<HTMLDivElement>(null)

    const onSubmit = async(e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        const data = new FormData(e.currentTarget);
        const queryText = data.get("query")
        const jsonData = JSON.stringify({command:queryText})
        const newMessage = [...messageStack]
        try {
            const result = await fetch( apiUrl + 'query', {
                method: 'post',
                body: jsonData,
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
            })
            if (result.ok) {
                const resData = await result.json() as apiResponseInterface
                newMessage.push(<Box key={uuidv4()} sx={{...messageBoxStyle,...sentMessageStyle}}>{queryText as string}</Box>)
                if(resData.status){
                    newMessage.push(
                        <DataTable key={uuidv4()}
                            sx={{...sentMessageStyle,...receivedMessageStyle, maxHeight: 400, width: '100%' }} 
                            data={resData.data.rows as []}
                        />)
                }else{
                    const errText = []
                    for(const i in resData.data.message){
                        errText.push(<Typography key={i} sx={{paddingLeft:"10px"}}>{i}:{resData.data.message[i]}</Typography>)
                    }
                    newMessage.push(<Box key={uuidv4()} sx={{...messageBoxStyle,...receivedMessageStyle}}>{"{"}{errText}{"}"}</Box>)
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
        setloading(false)
        setMessageStack(newMessage)
    }

    useEffect(()=>{
        const resetScroll = setTimeout(()=>{
            if(archorRef.current){
                archorRef.current.scrollIntoView({behavior:"smooth",block:"nearest"})
            }    
        },500)
        return ()=>{
            clearTimeout(resetScroll)
        }
    },[loading])
    return(
        <>
            <Stack position={"relative"} width={"100%"} minHeight={"80vh"}>
                <Stack sx={{display:"flex",overflowY:"auto",scrollbarWidth: "none",height:"80vh"}}>
                    {messageStack}
                    <CircularProgress sx={{alignSelf:"end",display:`${loading?"block":"none"}`}} size={"20px"}/>
                    <div id="archor" ref={archorRef}></div>
                </Stack>
                <Box component={"form"} onSubmit={(e)=>{onSubmit(e);setloading(true)}} position={"absolute"} 
                        bottom={"-5%"} left={0} display={"flex"} flexDirection={"row"} width={"100%"}>
                    <FormControl sx={{flex:1,display:"flex",flexDirection:"row"}}>
                        <TextField
                            // error={usernameError}
                            // helperText={usernameErrorMessage}
                            id="query"
                            type="query"
                            name="query"
                            placeholder="Enter command"
                            autoComplete="query"
                            autoFocus
                            required
                            fullWidth
                            variant="outlined"
                            // color={usernameError ? 'error' : 'primary'}
                        />
                    </FormControl>
                    <Button type="submit" variant="outlined">
                        SEND
                    <Send sx={{marginLeft:"5px"}}/></Button>
                </Box>
            </Stack>
        </>
    )
}
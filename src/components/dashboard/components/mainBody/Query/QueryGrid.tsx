import { Send } from "@mui/icons-material";
import { Box, Button, Container, FormControl, FormLabel, Stack, TextField } from "@mui/material";
import { FormEvent, ReactElement, useContext, useState } from "react";
import { apiResponseInterface, contextInterface } from "../../../../../AppTyscript";
import { Context } from "../../../../base/ContextWarper";
import DataTable from "../../../../extra/DataTable";

const apiUrl = import.meta.env.VITE_API_URL

export default function DataQuery(){
    const sentMessageStyle ={ backgroundColor:"#5C6BC0",alignSelf:"end"}
    const receivedMessageStyle= {backgroundColor:"#B0BEC5",alignSelf:"start"}
    const messageBoxStyle = {padding:"5px 15px 5px 15px", borderRadius:"15px"}
    const {setSnack}=useContext(Context) as contextInterface
    const [messageStack,setMessageStack] = useState<ReactElement[]>([])

    const onSubmit = async(e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        const data = new FormData(e.currentTarget);
        const queryText = data.get("query")
        const jsonData = JSON.stringify({command:queryText})
        let newMessage = [...messageStack]
        try {
            let result = await fetch( apiUrl + 'query', {
                method: 'post',
                body: jsonData,
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
            })
            if (result.ok) {
                const resData = await result.json() as apiResponseInterface
                newMessage.push(<Box sx={{...messageBoxStyle,...sentMessageStyle}}>{queryText as string}</Box>)
                if(resData.status){
                    newMessage.push(
                        <DataTable 
                            sx={{...sentMessageStyle,...receivedMessageStyle, maxHeight: 400, width: '100%' }} 
                            data={resData.data.rows as []}
                        />)
                }else{
                    newMessage.push(<Box sx={{...messageBoxStyle,...receivedMessageStyle}}>{JSON.stringify(resData)}</Box>)
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
        setMessageStack(newMessage)
    }

    return(
        <>
            <Stack position={"relative"} width={"100%"} minHeight={"80vh"}>
                <Stack sx={{display:"flex",overflow:"auto",height:"80vh"}}>
                    {messageStack}
                </Stack>
                <Box component={"form"} onSubmit={onSubmit} position={{xs:"fixed",md:"absolute"}} bottom={0} left={0} display={"flex"} flexDirection={"row"} width={"100%"}>
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
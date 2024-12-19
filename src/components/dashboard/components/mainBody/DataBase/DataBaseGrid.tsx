import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import { apiResponseInterface, contextInterface} from '../../../../../AppTyscript';
import { Context } from '../../../../base/ContextWarper';
import upperCaseFirstLetter from '../../../../../assets/module/upperCaseFirstletter';
import DataTable from '../../../../extra/DataTable';
import {Backdrop, Button, Card, CardActions, CardContent,IconButton, LinearProgress,} from '@mui/material';
import { Add, Close, Delete, Edit, FastForward, Replay } from '@mui/icons-material';
import CS from '../../../../../assets/css/component.module.css'
import { GridRenderCellParams, GridToolbar } from '@mui/x-data-grid';
import AddForm from './AddForm';
import FastAddForm from './FastAddForm';

const apiUrl = import.meta.env.VITE_API_URL

export default function DataBase() {
  const [tableType, setTableType] = React.useState(0);
  const [dataTable,setDatatable] = React.useState<string[]>([])
  const {setSnack} = React.useContext(Context) as contextInterface
  const [itemData,setItemData] = React.useState< {[key: string]: unknown}>({})
  const [loadding,setLoading] = React.useState(false)
  const [confirm,setConfirm] = React.useState<null|string>(null)
  const [addform,setAddform] = React.useState<{status:boolean,update:number|string|null}>({status:false,update:null})
  const [fastAdd,setFastAdd] = React.useState(false) 
  const [backdrop,setBackdrop] = React.useState(false)

  const closeAddform = {status:false,update:null}

  const RenderEditColumn = (grid:GridRenderCellParams) =>{
    return(
      <>
        <Stack direction={"row"}>
          <IconButton onClick={()=>{
              setConfirm(`${grid.rowNode.id}`)
              setBackdrop(true)
            }}><Delete/></IconButton>
          <IconButton onClick={()=>{
            setBackdrop(true);
            setAddform({status:true,update:grid.rowNode.id})
          }}><Edit/></IconButton>
        </Stack>
      </>
    )
  }
  
  const fetchTable = async(props?:{tableName?:string,deleteRow?:string})=>{
    const {tableName,deleteRow} = props||{}
    try{
      let result
      if(tableName){
        result = await fetch( apiUrl + `query/dataTable/${tableName}`, {
          method: 'GET',
          credentials: 'include',
        })
      }else if(deleteRow){
        result = await fetch( apiUrl + `query/delete?tableName=${dataTable[tableType]}&rowId=${deleteRow}`, {
          method: 'DELETE',
          credentials: 'include',
        })
      }else{
        result = await fetch( apiUrl + 'query/dataTable', {
          method: 'GET',
          credentials: 'include',
        })
      } 
      if (result.ok) {
        const resData = await result.json() as apiResponseInterface
        if (resData.status) {
          if(tableName){
            const newItemData = {...itemData}
            newItemData[dataTable[tableType]] = resData.data.rows
            setItemData(newItemData)
          }else if(deleteRow){
            setSnack({isOpen:true,message:(resData.data.message as unknown) as string})
            setBackdrop(false);
            setConfirm(null);
            fetchTable({tableName:dataTable[tableType]})
          }else{
            setDatatable(resData.data.rows as string[])
            
          }
        } else {
          setSnack({isOpen:true,message:JSON.stringify(resData.data.message)})
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
    setLoading(false)
  }
  
  const CloseBackdrop = ()=>{
    return(
      <>
        <IconButton sx={{position:"absolute",zIndex:4,top:"0px",right:"0px"}} onClick={()=>{
          setBackdrop(false);
          setConfirm(null);
          setAddform(closeAddform);
          setFastAdd(false)
        }}><Close/></IconButton>
      </>
    )
  }
  
  React.useEffect(()=>{
    fetchTable()
  },[])

  React.useEffect(()=>{
    if(dataTable.length !=0){
      if(!itemData[dataTable[tableType]]){
        fetchTable({tableName:dataTable[tableType]})
      }
    }
  },[dataTable,tableType])


  return (
    
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
      {/* cards */}
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        DataBase
      </Typography>
      <Backdrop
        sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
        open={backdrop}
        >
        <>
         {confirm==null||<Card sx={{ maxWidth: 345 }}>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Are you sure you want to delete this row?
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" onClick={()=>confirm!=null?fetchTable({deleteRow:confirm}):""}>YES</Button>
            <Button size="small" onClick={()=>{setBackdrop(false);setConfirm(null)}}>CANCEL</Button>
          </CardActions>
        </Card>}
        {fastAdd&&
        <Box sx={{position:"relative"}}>
          <CloseBackdrop/>
          <FastAddForm tableName={dataTable[tableType]}/>
        </Box>
        }
        {addform.status&&<Box sx={{position:"relative"}}>
          <CloseBackdrop/>
          <AddForm tableName={dataTable[tableType]} update={addform.update as string}
            onSubmit={()=> {
              setBackdrop(false);
              setAddform(closeAddform);
              fetchTable({tableName:dataTable[tableType]})
            }}/>
        </Box>}
        </>
      </Backdrop>
      <Stack height="450px" width="100%">
        <Stack direction={"row"}>
          <FormControl sx={{ width: '200px', pb: 1 }}>
            <InputLabel id="demo-simple-select-label">Table</InputLabel>
            <Select
              labelId="demo-user-type-label"
              id="demo-user-type"
              value={tableType}
              label="User Type"
              onChange={(event: SelectChangeEvent<number>) => {
                setTableType(event.target.value as number); 
              }}
            >
              {dataTable.map((item,index)=>
                <MenuItem key={index} value={index}>{upperCaseFirstLetter(item)}</MenuItem>
              )}
            </Select>
          </FormControl>
          <IconButton onClick={()=>{
              fetchTable({tableName:dataTable[tableType]})
              setLoading(true)
            }}><Replay className={loadding?CS.rotatingElement:""}/></IconButton>
          <IconButton onClick={()=>{setBackdrop(true);setAddform({status:true,update:null});}}><Add/></IconButton>
          <IconButton onClick={()=>{setBackdrop(true);setFastAdd(true);}}><FastForward/></IconButton>
        </Stack>
        {itemData[dataTable[tableType]]
          ?<DataTable 
            sx={{ height: 600, width: '100%' }} 
            data={itemData[dataTable[tableType]] as []} 
            renderCell={{Tool:{render:RenderEditColumn as (prop:unknown)=>React.ReactElement}}}
            slot={{ toolbar: GridToolbar }}
          />
          :<LinearProgress/>}
      </Stack>
    </Box>
  );
}

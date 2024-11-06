import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef, GridColType } from '@mui/x-data-grid';
import { SxProps } from '@mui/material';
interface propsType{
  data:unknown[],
  sx:SxProps,
}

export default function DataTable(props:propsType) {
  const [column,setColumn] = React.useState<unknown[]>([])
  const [row,setRow] = React.useState<unknown[]>([])

  const processData = ()=>{
    let newcolumns = []
    let newRows:unknown[] = []
    if(props.data){
      if(Array.isArray(props.data)){
        let isIdExist = false
        for(let i in props.data[0] as object){
          if(i == "id"){
            newcolumns.push({ field: 'id', headerName: 'ID', width: 90 })
            isIdExist = true
          }else{
            newcolumns.push({
              field:i,
              headerName: i,
              type: typeof(i) as undefined|GridColType,
              width: 110,
              editable: true,
            })
          }
        }
        if(!isIdExist){
          let count = 0
          for(let i of props.data as []){
            newRows.push({...i as {},id:count})
          }
        }else{
          newRows = [...props.data as []]
        }
      }
    }
    setRow(newRows)
    setColumn(newcolumns)
  }
  React.useEffect(()=>{
    processData()
  },[])
  return (
    <>
    {row.length !=0&&<Box sx={{...props.sx}}>
        <DataGrid
          rows={row as []}
          columns={column as []}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Box>}
    </>
  );
}
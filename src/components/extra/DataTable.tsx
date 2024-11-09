import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid,GridColType, GridSlotsComponent} from '@mui/x-data-grid';
import { SxProps } from '@mui/material';
interface renderType{
  render:(props:unknown)=>React.ReactElement|React.ReactElement
}
interface propsType{
  data:unknown[],
  sx:SxProps,
  renderCell?:{[key:string]:renderType}
  slot?:Partial<GridSlotsComponent>
}

export default function DataTable(props:propsType) {
  const newcolumns = []
    let newRows:unknown[] =[]
    if(props.data){
      if(Array.isArray(props.data)){
        let isIdExist = false
        const isColumsExist = []
        for(const i in props.data[0] as object){
          let renderElement
          if(props.renderCell&&props.renderCell[i]){
            renderElement = props.renderCell.render
            isColumsExist.push(i)
          }
          if(i == "id"){
            newcolumns.push({ field: 'id', headerName: 'ID', width: 90 })
            isIdExist = true
          }else{
            newcolumns.push({
              field:i,
              headerName: i,
              type: typeof(i) as undefined|GridColType,
              width: 110,
              renderCell:renderElement,
            })
          }
        }
        if(props.renderCell){
          const newColumnName = props.renderCell
          for(const i in newColumnName ){
            if(isColumsExist.indexOf(i) == -1){
              newcolumns.push({
                field:i,
                headerName: i,
                type: typeof(i) as undefined|GridColType,
                width: 110,
                renderCell:props.renderCell[i].render,
              })
            }
          }
        }
        if(!isIdExist){
          let count = 0
          for(const i of props.data as []){
            newRows.push({...i as object,id:count})
            count = count + 1
          }
        }else{
          newRows = [...props.data as []]
        }
      }
    }
  
  return (
    <>
    <Box sx={{...props.sx}}>
        <DataGrid
          rows={newRows as []}
          columns={newcolumns as []}
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
          slots={props.slot||{}}
        />
      </Box>
    </>
  );
}
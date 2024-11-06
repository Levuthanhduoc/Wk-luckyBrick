import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import { useDemoData } from '@mui/x-data-grid-generator';

const TableType = {
  Users: 0,
  Shop: 1,
  Game: 2,
  Tutorial:3,
};

export default function DataBase() {
  const [tableType, setTableType] = React.useState(TableType.Users);
  const { data } = useDemoData({
    dataSet: 'Commodity',
    rowLength: 10,
    maxColumns: 7,
  });

  const columnVisibilityModel = React.useMemo(() => {
    if (tableType === TableType.Shop) {
      return {
        quantity: true,
        filledQuantity: true,
        id: true,
      };
    }
    return {
      quantity: false,
      filledQuantity: false,
      id: false,
    };
  }, [tableType]);
  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' } }}>
      {/* cards */}
      <Typography component="h2" variant="h6" sx={{ mb: 2 }}>
        DataBase
      </Typography>
      <Stack height="450px" width="100%">
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
          <MenuItem value={TableType.Users}>Users</MenuItem>
          <MenuItem value={TableType.Shop}>Shop</MenuItem>
        </Select>
      </FormControl>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          {...data}
          disableColumnSelector
          columnVisibilityModel={columnVisibilityModel}
          slots={{
            toolbar: GridToolbar,
          }}
        />
      </div>
    </Stack>
    </Box>
  );
}

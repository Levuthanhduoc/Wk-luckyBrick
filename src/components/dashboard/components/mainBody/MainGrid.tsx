import * as React from 'react';
import Box from '@mui/material/Box';

import { Routes,Route } from 'react-router-dom';
import { LinearProgress } from '@mui/material';
const Overview = React.lazy(()=>import('./home/OverviewGrid'))
const DataBase = React.lazy(()=>import('./DataBase/DataBaseGrid'))
const Query = React.lazy(()=>import('./Query/QueryGrid'))

export default function MainGrid() {
  return (
    <Box sx={{ width: '100%', maxWidth: { sm: '100%', md: '1700px' },flex:1}}>
      {/* cards */}
      <React.Suspense 
        fallback={
          <div className="pt-3 text-center">
            <LinearProgress/>
          </div>
        }
      >
        <Routes>
          <Route path="/database" element={<DataBase />} />
          <Route path="/Query" element={<Query />} />
          <Route path="/*" element={<Overview />}/>
        </Routes>
      </React.Suspense>
      
    </Box>
  );
}

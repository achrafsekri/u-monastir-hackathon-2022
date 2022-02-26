import React from 'react';
import Input_td from './input_td';
import Input_tp from './input_tp';
import { Box } from '@mui/system';

export default function Step3() {
  return (
    <Box  sx={{ display: 'flex', width:'35vw',height:'30vh',justifyContent:'center',alignItems:'center', pt: 2 ,justifySelf:'center',alignSelf:'center'}}>
      <Input_td></Input_td>
      <Input_tp></Input_tp>
      </Box>
  )
}

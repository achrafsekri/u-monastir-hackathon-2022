import React from 'react'
import { Box } from '@mui/system'
import  TextField  from '@mui/material/TextField'
import { useState } from 'react'
import seance from './seance'

export default function Step1() {
    const handelchange=(e)=>{
        seance.matiere=e.target.value;
    }
  return (
    <Box  sx={{ display: 'flex', width:'35vw',height:'30vh',justifyContent:'center',alignItems:'center', pt: 2 ,justifySelf:'center',alignSelf:'center'}}>
     <TextField
          id="standard-password-input"
          label="Matière"
          type="text"
          autoComplete="current-password"
          variant="standard"
          fullWidth 
          onChange={handelchange}
          required
        />
    </Box>
        )
}

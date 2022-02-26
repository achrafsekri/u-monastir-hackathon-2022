import React from 'react'
import { Box } from '@mui/material';
import './select.css'

import { useState } from 'react';
import { useEffect } from 'react';

export default function Select_seance(props) {
  const[change,setchange]=useState(false);
  

    const handelsubmit=()=>{
      if(change===true)
        {
          props.handelsub();
        }
        else{
          window.alert('please select');
        }
        }
    const handelchange=(e)=>{
        props.func(e.target.value);
    }
  return (
        <form action ='submit' >
            <label style={{display:'flex',justifyContent:'space-between',gap:'10vw'}}>selectioner la date:
                <input type="date" classeName='date' name="bday" required pattern="\d{4}-\d{2}-\d{2}" onChange={handelchange}></input>
                <span className='validity'></span>
                
            </label>
            
  
</form>
  )
}

import React from 'react'
import Pre from '../components/table/precedente'
import { useState } from 'react'
import { Box,Container,CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Select_seance from '../components/selector/select_seance';
import { useEffect } from 'react';
import Button from '@mui/material/Button';
import Tab_seance from '../table_seance/tab_seance';
import Tab_etudiant_pre from '../table_seance/Tab_etudiant_pre';

const theme = createTheme({
  palette: {
    primary: {
      main:'#673ab7',
    },
    secondary: {
      main: '#673ab7',
    },
  },
});

export default function Seance_precedente() {
  const [step,setstep]=useState(1);
  const [date,setdate]=useState('');
  const [seance,setseance]=useState('');
  const[allseance,setallseance]=useState([{id:'1',nom:'ashraf'}]);

  const handelsend=(da)=>{
    setdate(da);
  }

  const starting=()=>{
    return <div style={{display:'flex',justifyContent:'space-between', width:'inherit',height:'',marginTop:'15vh'}}>
      <Select_seance func={handelsend}></Select_seance>
      <Button variant="outlined" size='medium'  onClick={()=>
      { 
        setallseance();
        setstep(step=>step+1);
      }
    }>Afficher les seances</Button>
      </div>
  }
  
  const display_tab_seance=()=>{
    return <div style={{width:'70vw'}}>
      <Tab_seance func={setseance} sent={[{id:'1',date:'ashraf'}]}></Tab_seance>
      <Button variant="outlined" size='medium' style={{marginTop:'10px'}} onClick={()=>{seance!==''?setstep(step=>step+1):window.alert('selectioner au moins une seance')}}>Afficher cette Seances</Button>
    </div>
  }

  const display_seance=()=>{
    return <Tab_etudiant_pre sent={allseance}></Tab_etudiant_pre>
  }

  return (<React.Fragment>
    <CssBaseline />
    <ThemeProvider theme={theme}>
    <Container maxWidth="md">
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        Height="80vh"
        width='inherit'
        sx={{ flexDirection: 'column', margin:'20px'}}
      >
        
        {
          step===1  && starting()
          
          
        }
        {
          step===2 && display_tab_seance()
        }
        {
          step===3 && display_seance()
        }
        
      </Box>
    </Container>
    </ThemeProvider>
  </React.Fragment>
  )
}

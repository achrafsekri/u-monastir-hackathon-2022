import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Doodles from '../assets/images/doodle1.svg'
import { Button,Link } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Stepper from '../components/stepper/stepper';
import { useState } from 'react';
import seance from '../components/stepper/seance';
import { useEffect } from 'react';
import Table from '../components/table/Table'
import axios from "axios"
import user from '../components/user/user'

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


export default function Cree_seance() {
  
  const [cree,setcree] = useState('start');
  const [newseance,setnewseance] = useState({});
  const[etudata,setetudata]=useState([]);
  
const get_etudiant=()=>{
  console.log(seance);
  axios.post('http://localhost:4000/seance', seance)
  .then(function (response) {
    setetudata(response.data.etudiants);
    // setnewseance(response.seance);
    localStorage.setItem("seanceid", response.data.seance._id);

  })
  .catch(function (error) {
    console.log('error');
  });
}


  const change =()=>{

    const d = new Date();
    setcree('tab');
    seance.enRef=user.id;
    const day=[d.getMonth()+1,d.getDate(),d.getFullYear()];
    const heuredeb=[d.getHours(),d.getMinutes()];
    const heuref=[d.getHours()+2,d.getMinutes()];
    seance.date=day.join('/');
    seance.startAt=day.join('/')+" "+heuredeb.join(':');
    seance.endAt=day.join('/')+" "+heuref.join(':');
    seance.filiere=seance.filiere.join();
    seance.id=(Math.random() + 1).toString(36).substring(7);
    seance.tp=seance.tp.toString();
    seance.td=seance.td.toString();

    get_etudiant();
  }

  // useEffect(()=>{
    
  // })

  useEffect(() => {
    if(seance.filiere.length>0) 
      {setcree('tab')}
      get_etudiant();
  },[]);
  etudata.forEach((etudiant)=>{
    etudiant.presence=false;
  });

  const display_cree=()=>{
    
    // setInterval(() => {
    //   fetch("/test").then(
    //     Response=>Response.json()
    //     ).then(
    //       data=>{setetudata(data)}
    //       );
    //   console.log(etudata);
    // }, 8000);

    const handelterminer=()=>{

      seance.enRef='';
      seance.tp='';
      seance.td='';
      seance.filiere='';
      seance.startAt='';
      seance.endAt='';
      seance.matiere='';
      seance.date='';
      setcree('start');

    }

    return<Box display="flex"
    justifyContent="center"
    alignItems="center"
    Height="100vh"
    width="inherit"
    sx={{ flexDirection: 'column', margin:'0'}}
    >
      <div className="buttoncontainer" style={{display:"flex" ,justifyContent:"flex-start", width:'inherit',marginBottom:'10px'}}>
    <Link href="/generate-qr-code" target="_blank" underline="none">
      <Button variant="outlined" size='large' sx={{margin:'5px'}} >QR code</Button>
    </Link>
    <Button variant="outlined" size='large' sx={{ margin:'5px'}} onClick={handelterminer}>Terminer la seance</Button>
    </div>
      <Table etud={etudata} id={seance.id}></Table>
    </Box>
  }

  const starting=()=>{
    return <Box display="flex"
    justifyContent="center"
    alignItems="center"
    Height="80vh"
    sx={{ flexDirection: 'column', margin:'20px'}}
    >
      <img src={Doodles} alt="" style={{width:'30vw',hight:'30vh'}} />
    <Button color="primary" variant="contained" size="medium" sx={{marginTop:'10px'}}
    onClick={()=>{
      setcree('now')
    }}
    >Cree une seance
    </Button>
    </Box>
  }
  
  return (
    <React.Fragment>
      <CssBaseline />
      <ThemeProvider theme={theme}>
      <Container maxWidth="md">
        {/* <Box sx={{ height: '70vh', width: '50vw' }} /> */}
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          Height="80vh"
          width='inherit'
          sx={{ flexDirection: 'column', margin:'20px'}}
        >
          
          {
            cree==='start'  && starting()
            
            
          }
          {
            cree==='tab'&&display_cree()
          }
          {
            cree==='now'&& <Stepper change={change}/>
          }
          
        </Box>
      </Container>
      </ThemeProvider>
    </React.Fragment>
  );
}

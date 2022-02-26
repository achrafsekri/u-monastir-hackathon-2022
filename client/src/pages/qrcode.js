import React from 'react'
import QRCode from 'qrcode';
import {useState,useEffect} from 'react';
import Button from '@mui/material/Button';
import { Box } from '@mui/material';
import './qrcode.css'
import axios from 'axios';
import seance from '../components/stepper/seance';
import user from '../components/user/user'

export default function Qrcode() {
  const [code,setcode]=useState('');
  const [hidden,sethidden]=useState('hidden');
  const [text,settext]=useState('abss');
  //le string du qr code 
  const [qrcode,setqrcode]=useState('');
  const [seance,setseance]=useState(null);

  //object to send everything is set up


  const generate_qr=()=>{
      let te=(Math.random() + 1).toString(36).substring(7);
      settext(te);
      let seance_send={email:user.email,password:user.password,seanceId:localStorage.seanceid,code:text};

      axios.post('localhost:4000/seance/generate-code',seance_send)
      .then(function (response) {
        console.log(response)
       
      })
      .catch(function (error) {
        console.log(error);
      });
      

      sethidden('display');
      QRCode.toDataURL(text).then((data)=>{
        setcode(data);
        setqrcode(text);
        console.log(qrcode);
      });
      console.log(seance_send);


      const interval = setInterval(() => {
        
        let te=(Math.random() + 1).toString(36).substring(7);
        console.log(te);
        QRCode.toDataURL(te).then((data)=>{
        setcode(data);
        settext(te);
        let seance_send={email:user.email,password:user.password,seanceId:localStorage.seanceid,code:text};

      axios.post('localhost:4000/seance/generate-code',seance_send)

      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
        
        
    });
      }, 8000);
      return () => clearInterval(interval);
    
  };
  

  
  return (
    <Box sx={{display: 'flex',
      width: 'inerit',
      height: 'inherit',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column'}}>
      <div className="image_container">
      <img src={code} className={hidden}  alt="qr code" />
      </div>
      <Button variant="outlined" onClick={generate_qr}>generate a QR code</Button>
    </Box>
  );
}

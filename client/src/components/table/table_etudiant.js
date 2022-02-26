import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import etudiant from './etudiant2';
import { useEffect } from 'react';
import axios from "axios";
import { useState } from 'react';


export default function DataTable() {
  const [data,setdata]=useState([]);

  useEffect(() => {
      axios.get("http://localhost:4000/etudiant")
      .then((response) => setdata(response.data));
  }, []);

  console.log(data);
  let i=0;
  data.forEach(element => {
      element.id=i+1;
      i++;
    });

  const rows = data;
  
  
  const columns = [
    { field: 'cin', headerName: 'CIN', width: 130 },
    { field: 'nom', headerName: 'Nom', width: 130 },
    { field: 'prenom', headerName: 'Prenom', width: 130 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'filiere', headerName: 'Classe', width: 100 },
    { field: 'td', headerName: 'TD', width: 70 },
    { field: 'tp', headerName: 'TP', width: 70 },
    { field: 'absence', headerName: 'absence', width: 70 },
  ];
  
  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        
      />
    </div>
  );
}

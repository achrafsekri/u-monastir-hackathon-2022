import React from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { useEffect } from 'react';
import axios from "axios";
import { useState } from 'react';

function Tab_seance(props) {

    // const rows=props.sent;
    const rows=[{id:'1',date:'ashraf'}];
    const columns = [
        { field: 'matiere', headerName: 'Matiere', width: 200 },
        { field: 'date', headerName: 'Date', width: 130 },
        { field: 'startAt', headerName: 'Heure debut', width: 130 },
        { field: 'endAt', headerName: 'Heure fin', width: 130 },
        { field: 'filiere', headerName: 'Filiere', width: 100 },
        { field: 'td', headerName: 'TD', width: 70 },
        { field: 'tp', headerName: 'TP', width: 70 },
      ];

      const handelcklick=(rowData)=>{
          props.func(rowData.row.id);
      }
      return (
        <div style={{ height: 400, width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            checkboxSelection
            onRowClick={handelcklick}
          />
        </div>
      );
    }

export default Tab_seance;
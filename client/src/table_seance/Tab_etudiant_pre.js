import React from 'react'
import { DataGrid } from '@mui/x-data-grid';

export default function Tab_etudiant_pre(props) {

    const rows= props.sent;
    // const rows=[{id:'1',date:'ashraf'}]
    const columns = [
        { field: 'nom', headerName: 'Nom', width: 130 },
        { field: 'nom', headerName: 'Nom', width: 130 },
        { field: 'prenom', headerName: 'Prenom', width: 130 },
        { field: 'email', headerName: 'Email', width: 200 },
        { field: 'filiere', headerName: 'Classe', width: 100 },
        { field: 'td', headerName: 'TD', width: 70 },
        { field: 'tp', headerName: 'TP', width: 70 },
        { field: 'absence', headerName: 'absence', width: 70 },
      ];

      return (
        <div style={{ height: 400, width: '70vw' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            rowsPerPageOptions={[10]}
            checkboxSelection
          />
        </div>
      );
    }

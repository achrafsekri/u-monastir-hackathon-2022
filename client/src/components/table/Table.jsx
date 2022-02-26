import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import etudiant_list from './etudiant_list';
import Switch from './switch'



export default function BasicTable(props) {
  const rows = props.etud;
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table" stickyHeader={true} rowCount={5}>
        <TableHead>
          <TableRow >
            <TableCell>Nom</TableCell>
            <TableCell align="right">Prenom</TableCell>
            <TableCell align="right">Email</TableCell>
            <TableCell align="right">Classe</TableCell>
            <TableCell align="right">TD</TableCell>
            <TableCell align="right">TP</TableCell>
            <TableCell align="right">Presence</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.nom}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.nom}
              </TableCell>
              <TableCell align="right">{row.prenom}</TableCell>
              <TableCell align="right">{row.email}</TableCell>
              <TableCell align="right">{row.classe}</TableCell>
              <TableCell align="right">{row.td}</TableCell>
              <TableCell align="right">{row.tp}</TableCell>
              <TableCell align="right"><Switch check={row.presence} cin={row.cin} id={props.id}></Switch></TableCell>
            </TableRow>
          ))}
        </TableBody>
            
      </Table>
    </TableContainer>
  );
}

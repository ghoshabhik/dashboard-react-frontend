/* eslint-disable */ 

import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import ProjectMenu from './ProjectMenu'

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

function createData(id, Name, GitHubUrl, StartDate, EndDate, PlannedNoOfDays, Status) {
  return { id, Name, GitHubUrl, StartDate, EndDate, PlannedNoOfDays, Status };
}


const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function ProjectTable({data, user}) {
  const classes = useStyles();
  var rows = [];
//   console.log('==============================',data)
  if(data.length > 0){
    data.map(topic => {
        rows.push(createData(topic.id, topic.fields.Name, topic.fields.GitHubUrl, topic.fields.StartDate, topic.fields.EndDate,
          topic.fields.PlannedNoOfDays, topic.fields.Status))
    })
    console.log('==============================',rows)
    }
   const tableRows =  rows.length > 0 ? <TableContainer component={Paper}>
   <Table className={classes.table} aria-label="customized table">
     <TableHead>
       <TableRow>
       <StyledTableCell align="center">#</StyledTableCell>
         <StyledTableCell>Project</StyledTableCell>
         <StyledTableCell align="center">Github Repo</StyledTableCell>
         <StyledTableCell align="center">Planned Start Date</StyledTableCell>
         <StyledTableCell align="center">Planned End Date</StyledTableCell>
         <StyledTableCell align="center">Planned Days</StyledTableCell>
         <StyledTableCell align="center">Status</StyledTableCell>
       </TableRow>
     </TableHead>
     <TableBody>
       {rows.map((row, i) => (
         <StyledTableRow key={row.id}>
           <StyledTableCell align="center">{i+1}</StyledTableCell>
           <StyledTableCell component="th" scope="row">
             {row.Name}
           </StyledTableCell>
           <StyledTableCell align="center">{row.GitHubUrl}</StyledTableCell>
           <StyledTableCell align="center">{row.StartDate}</StyledTableCell>
           <StyledTableCell align="center">{row.EndDate}</StyledTableCell>
           <StyledTableCell align="center">{row.PlannedNoOfDays}</StyledTableCell>
           <StyledTableCell align="center"><ProjectMenu selectedVal={row.Status} keyId={row.id} user={user}/></StyledTableCell>
         </StyledTableRow>
       ))}
     </TableBody>
   </Table>
 </TableContainer> : <div>No Data</div>
  return (
    <>
    {tableRows}
    </>
  ) 
}
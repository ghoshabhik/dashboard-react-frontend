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
         <StyledTableCell>Project</StyledTableCell>
         <StyledTableCell align="right">Github Repo</StyledTableCell>
         <StyledTableCell align="right">Planned Start Date</StyledTableCell>
         <StyledTableCell align="right">Planned End Date</StyledTableCell>
         <StyledTableCell align="right">Planned Days</StyledTableCell>
         <StyledTableCell align="right">Status</StyledTableCell>
       </TableRow>
     </TableHead>
     <TableBody>
       {rows.map((row) => (
         <StyledTableRow key={row.id}>
           <StyledTableCell component="th" scope="row">
             {row.Name}
           </StyledTableCell>
           <StyledTableCell align="right">{row.GitHubUrl}</StyledTableCell>
           <StyledTableCell align="right">{row.StartDate}</StyledTableCell>
           <StyledTableCell align="right">{row.EndDate}</StyledTableCell>
           <StyledTableCell align="right">{row.PlannedNoOfDays}</StyledTableCell>
           <StyledTableCell align="right"><ProjectMenu selectedVal={row.Status} keyId={row.id} user={user}/></StyledTableCell>
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
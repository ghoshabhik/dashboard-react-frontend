import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import JobMenu from './JobMenu'

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

function createData(id, JobName, JobSiteURL, LastDateOfApplication, Status) {
  return { id, JobName, JobSiteURL, LastDateOfApplication, Status };
}


const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function ExamTable({data, user}) {
  const classes = useStyles();
  var rows = [];
//   console.log('==============================',data)
  if(data.length > 0){
    data.map(topic => {
        rows.push(createData(topic.id, topic.fields.JobName, topic.fields.JobSiteURL, topic.fields.LastDateOfApplication,
            topic.fields.Status))
    })
    console.log('==============================',rows)
    }
   const tableRows =  rows.length > 0 ? <TableContainer component={Paper}>
   <Table className={classes.table} aria-label="customized table">
     <TableHead>
       <TableRow>
         <StyledTableCell>Job Name</StyledTableCell>
         <StyledTableCell align="right">URL</StyledTableCell>
         <StyledTableCell align="right">Application Last Date</StyledTableCell>
         <StyledTableCell align="right">Status</StyledTableCell>
       </TableRow>
     </TableHead>
     <TableBody>
       {rows.map((row) => (
         <StyledTableRow key={row.id}>
           <StyledTableCell component="th" scope="row">
             {row.JobName}
           </StyledTableCell>
           <StyledTableCell align="right">{row.JobSiteURL}</StyledTableCell>
           <StyledTableCell align="right">{row.LastDateOfApplication}</StyledTableCell>
           <StyledTableCell align="right"><JobMenu selectedVal={row.Status} keyId={row.id} user={user}/></StyledTableCell>
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
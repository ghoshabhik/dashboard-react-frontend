import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import ExamMenu from './ExamMenu'

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

function createData(id, ExamName, ExamPlannedDate, ExamRegistered, ExamTopicName, PlannedStartDate, Status) {
  return { id, ExamName, ExamPlannedDate, ExamRegistered, ExamTopicName, PlannedStartDate, Status };
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
        rows.push(createData(topic.id, topic.fields.ExamName[0], topic.fields.ExamPlannedDate[0], topic.fields.ExamRegistered[0],
            topic.fields.ExamTopicName, topic.fields.PlannedStartDate, topic.fields.Status))
    })
    console.log('==============================',rows)
    }
   const tableRows =  rows.length > 0 ? <TableContainer component={Paper}>
   <Table className={classes.table} aria-label="customized table">
     <TableHead>
       <TableRow>
         <StyledTableCell>Exam Name</StyledTableCell>
         <StyledTableCell align="right">Exam Planned Date</StyledTableCell>
         <StyledTableCell align="right">Exam Registered</StyledTableCell>
         <StyledTableCell align="right">Topic Name</StyledTableCell>
         <StyledTableCell align="right">Planned Start Date</StyledTableCell>
         <StyledTableCell align="right">Status</StyledTableCell>
       </TableRow>
     </TableHead>
     <TableBody>
       {rows.map((row) => (
         <StyledTableRow key={row.id}>
           <StyledTableCell component="th" scope="row">
             {row.ExamName}
           </StyledTableCell>
           <StyledTableCell align="right">{row.ExamPlannedDate}</StyledTableCell>
           <StyledTableCell align="right">{row.ExamRegistered}</StyledTableCell>
           <StyledTableCell align="right">{row.ExamTopicName}</StyledTableCell>
           <StyledTableCell align="right">{row.PlannedStartDate}</StyledTableCell>
           {/* <StyledTableCell align="right">{row.Status}</StyledTableCell> */}
           <StyledTableCell align="right"><ExamMenu selectedVal={row.Status} keyId={row.id} user={user}/></StyledTableCell>
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
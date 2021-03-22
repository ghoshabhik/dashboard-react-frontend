import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import BookMenu from './BookMenu'

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

function createData(id, BookName, Author, PlannedStartDate, PlannedEndDate, Rating, Status) {
  return { id, BookName, Author, PlannedStartDate, PlannedEndDate, Rating, Status };
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
        rows.push(createData(topic.id, topic.fields.BookName, topic.fields.Author, topic.fields.PlannedStartDate, topic.fields.PlannedEndDate,
          topic.fields.Rating, topic.fields.Status))
    })
    console.log('==============================',rows)
    }
   const tableRows =  rows.length > 0 ? <TableContainer component={Paper}>
   <Table className={classes.table} aria-label="customized table">
     <TableHead>
       <TableRow>
         <StyledTableCell>Book Name</StyledTableCell>
         <StyledTableCell align="right">Author</StyledTableCell>
         <StyledTableCell align="right">Planned Start Date</StyledTableCell>
         <StyledTableCell align="right">Planned End Date</StyledTableCell>
         <StyledTableCell align="right">Rating</StyledTableCell>
         <StyledTableCell align="right">Status</StyledTableCell>
       </TableRow>
     </TableHead>
     <TableBody>
       {rows.map((row) => (
         <StyledTableRow key={row.id}>
           <StyledTableCell component="th" scope="row">
             {row.BookName}
           </StyledTableCell>
           <StyledTableCell align="right">{row.Author}</StyledTableCell>
           <StyledTableCell align="right">{row.PlannedStartDate}</StyledTableCell>
           <StyledTableCell align="right">{row.PlannedEndDate}</StyledTableCell>
           <StyledTableCell align="right">{row.Rating}</StyledTableCell>
           <StyledTableCell align="right"><BookMenu selectedVal={row.Status} keyId={row.id} user={user}/></StyledTableCell>
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
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
import TextField from '@material-ui/core/TextField';
import TaskMenu from './TaskMenu'

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

function createData(id, taskName, taskCategory, taskDate, plannedHours, actualHours) {
  return { id, taskName, taskCategory, taskDate, plannedHours, actualHours };
}


const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function TaskTable({ data, user, handleLoad }) {
  const [hours, setHours] = React.useState()
  const classes = useStyles();
  var rows = [];
  //   console.log('==============================',data)

  function getFormattedDate(date) {
    if (!date) {
      return
    } else {
      var year = date.getFullYear();

      var month = (1 + date.getMonth()).toString();
      month = month.length > 1 ? month : '0' + month;

      var day = date.getDate().toString();
      day = day.length > 1 ? day : '0' + day;

      return year + '-' + month + '-' + day;
    }

  }
  if (data.length > 0) {

    data.map(topic => {
      rows.push(createData(topic._id, topic.taskName, topic.taskCategory, topic.taskDate,
        topic.plannedHours, topic.actualHours))
    })
    
  }
  const tableRows = rows.length > 0 ? <TableContainer component={Paper}>
    <Table className={classes.table} aria-label="customized table">
      <TableHead>
        <TableRow>
          <StyledTableCell>Task Name</StyledTableCell>
          <StyledTableCell align="right">Category</StyledTableCell>
          <StyledTableCell align="right">Task Date</StyledTableCell>
          <StyledTableCell align="right">Planned Hours</StyledTableCell>
          <StyledTableCell align="right">Actual Hours</StyledTableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row) => (
          <StyledTableRow key={row.id}>
            <StyledTableCell component="th" scope="row">
              {row.taskName}
            </StyledTableCell>
            <StyledTableCell align="right">{row.taskCategory}</StyledTableCell>
            <StyledTableCell align="right">{row.taskDate}</StyledTableCell>
            <StyledTableCell align="right">{row.plannedHours}</StyledTableCell>
            <StyledTableCell align="right"><TaskMenu selectedVal={row.actualHours} keyId={row.id} user={user} handleLoad={handleLoad}/></StyledTableCell>
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
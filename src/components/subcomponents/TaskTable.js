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
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

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
  const [tableData, setTableData] = React.useState(data)
  const classes = useStyles();
  var rows = [];
  //   console.log('==============================',data)

  const handleDelete = async (id) => {
    console.log(id, 'Will be deleted')
    const response = await fetch(`https://todoapp-abhik.netlify.app/api/delete-task?id=${id}`,
            {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );

    handleLoad()
  }

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
        <TableRow><StyledTableCell align="center">#</StyledTableCell>
          <StyledTableCell>Task Name</StyledTableCell>
          <StyledTableCell align="left">Category</StyledTableCell>
          <StyledTableCell align="left">Task Date</StyledTableCell>
          <StyledTableCell align="center">Planned Hours</StyledTableCell>
          <StyledTableCell align="center">Actual Hours</StyledTableCell>
          <StyledTableCell align="center">Delete</StyledTableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row, i) => (
          <StyledTableRow key={row.id}>
            <StyledTableCell align="center">{i+1}</StyledTableCell>
            <StyledTableCell component="th" scope="row">
            {row.taskName}
            </StyledTableCell>
            <StyledTableCell align="left">{row.taskCategory}</StyledTableCell>
            <StyledTableCell align="left">{row.taskDate}</StyledTableCell>
            <StyledTableCell align="center">{row.plannedHours}</StyledTableCell>
            <StyledTableCell align="center"><TaskMenu selectedVal={row.actualHours} keyId={row.id} user={user} handleLoad={handleLoad}/></StyledTableCell>
            <StyledTableCell align="center">
            <IconButton color="error" aria-label="upload picture" component="span" onClick={() => handleDelete(row.id)}>
              <HighlightOffIcon color="error"/>
            </IconButton>
            </StyledTableCell>
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
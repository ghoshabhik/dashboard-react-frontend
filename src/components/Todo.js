/* eslint-disable */
import 'date-fns';
import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import Button from '@material-ui/core/Button';
import TaskTable from './subcomponents/TaskTable'
import AddTask from './subcomponents/AddTask';

export const Todo = ({ user }) => {
    const [loggedinUser, setLoggedinUser] = useState(user);
    const [selectedDate, setSelectedDate] = React.useState(new Date());
    const [selectedDateTask, setSelectDateTask] = React.useState([]);
    const [totalPlannedHours, setTotalPlannedHours] = useState(0)
    const [totalActualHours, setTotalActualHours] = useState(0)
    const history = useHistory();

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
    const handleDateChange = (date) => {
        setSelectedDate(date);
    };
    const handleLoad = async () => {
        const response = await fetch(`https://todoapp-abhik.netlify.app/api/get-all-tasks?date=${getFormattedDate(selectedDate)}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
        const content = await response.json();
        setSelectDateTask(content)
        let hours = 0
        content.map( task => {
            hours+= task.plannedHours
        })
        setTotalPlannedHours(hours)
        console.log('Total Planned Hours: ',hours)
        hours = 0
        content.map( task => {
            hours+= task.actualHours
        })
        setTotalActualHours(hours)
        console.log('Total Actual Hours: ',hours)
    }
    const handleDefaultTaskLoad = async () => {
        console.log('Loading Default Tasks....')
        const response = await fetch(`https://todoapp-abhik.netlify.app/api/create-default-tasks?date=${getFormattedDate(selectedDate)}`,
            {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
        //const content = await response.json();
        handleLoad()
        
    }
    useEffect(() => {
        if (Object.keys(user).length === 0) {
            history.push('/login')
        }
        //setSelectedDate(new Date())
    }, [loggedinUser])
    //console.log(selectedDateTask)

    const listTasks = selectedDateTask.length === 0 ? <>No Tasks Found</> :
        <Container style={{marginTop:"30px"}}>
            <TaskTable data={selectedDateTask} user={loggedinUser} handleLoad={handleLoad}/>
            Total Planned Hours: {totalPlannedHours} {" "} Total Actual Hours: {totalActualHours}
        </Container>


    return (
        <>
            {Object.keys(user).length > 0 ?
                <div>
                    Tasks for {loggedinUser.user.username}. Today's Date: {getFormattedDate(new Date())}

                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <Grid container justify="center" style={{ marginTop: "30px" }}>
                            <KeyboardDatePicker
                                disableToolbar
                                variant="inline"
                                format="MM/dd/yyyy"
                                margin="normal"
                                id="date-picker-inline"
                                label="Choose Date"
                                value={selectedDate}
                                onChange={handleDateChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                            <Button variant="outlined" color="primary"
                                onClick={handleLoad}
                            >Load {getFormattedDate(selectedDate)} Tasks</Button>
                            <Button variant="outlined" color="primary"
                                onClick={handleDefaultTaskLoad}
                            >Create Default Tasks</Button>
                        </Grid>
                    </MuiPickersUtilsProvider>
                    {listTasks}
                    <div>
                        <AddTask selectedDate={getFormattedDate(selectedDate)} handleLoad={handleLoad}/>
                    </div> 
                </div>
                :
                <></>
            }
        </>
    )
}

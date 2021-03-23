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
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';


export const Dashboard = ({ user }) => {
    const [loggedinUser, setLoggedinUser] = useState(user);
    const [selectedStartDate, setSelectedStartDate] = React.useState(new Date());
    const [selectedEndDate, setSelectedEndDate] = React.useState(new Date());
    const [dashboardData, setDashboardData] = React.useState({});
    const history = useHistory();

    const handleDateStartChange = (date) => {
        setSelectedStartDate(date);
    };
    const handleDateEndChange = (date) => {
        setSelectedEndDate(date);
    };
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
    const getData = async () => {
        console.log(selectedStartDate, selectedEndDate)
        const response = await fetch(`https://todoapp-abhik.netlify.app/api/analyze-task-hours?startDate=${getFormattedDate(selectedStartDate)}&endDate=${getFormattedDate(selectedEndDate)}`,
            {
                method: 'get',
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
        const data = await response.json()
        setDashboardData(data)
        console.log(data)
    }
    useEffect(() => {
        if (Object.keys(user).length === 0) {
            history.push('/login')
        }
    }, [loggedinUser])
    return (
        <>
            {Object.keys(user).length > 0 ?
                <div>
                    Dashboard for {loggedinUser.user.username}
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <Grid container justify="center" style={{ marginTop: "30px" }}>
                            <KeyboardDatePicker
                                disableToolbar
                                variant="inline"
                                format="MM/dd/yyyy"
                                margin="normal"
                                id="start-date-picker-inline"
                                label="Choose Start Date"
                                value={selectedStartDate}
                                onChange={handleDateStartChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                            <KeyboardDatePicker
                                disableToolbar
                                variant="inline"
                                format="MM/dd/yyyy"
                                margin="normal"
                                id="end-date-picker-inline"
                                label="Choose End Date"
                                value={selectedEndDate}
                                onChange={handleDateEndChange}
                                KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                }}
                            />
                            <Button variant="outlined" color="primary"
                                onClick={getData}
                            >Load {getFormattedDate(selectedStartDate)} - {getFormattedDate(selectedEndDate)} Data</Button>
                        </Grid>
                    </MuiPickersUtilsProvider>
                    <Grid container justify="center" style={{ marginTop: "30px" }}>
                        <Card>
                            <CardContent>
                                <Typography variant="h5" component="h2">
                                    Planned Hours : {dashboardData.totalPlannedHours}
                                </Typography>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent>
                                <Typography variant="h5" component="h2">
                                Actual Hours : {dashboardData.totalActualHours}
                                </Typography>
                            </CardContent>
                        </Card>
                        
                    </Grid>
                </div>
                :
                <></>
            }
        </>
    )
}

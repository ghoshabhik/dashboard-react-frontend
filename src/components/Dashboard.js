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
import { Pie, Bar } from 'react-chartjs-2'


export const Dashboard = ({ user }) => {
    const [loggedinUser, setLoggedinUser] = useState(user);
    const [selectedStartDate, setSelectedStartDate] = React.useState(new Date());
    const [selectedEndDate, setSelectedEndDate] = React.useState(new Date());
    const [dashboardData, setDashboardData] = React.useState({});
    const [piePlannedData, setPiePlannedData] = React.useState({})
    const [pieActualData, setPieActualData] = React.useState({})
    const [barData, setBarData] = React.useState({})
    const [randomColors, setRandomColors] = React.useState([])
    const history = useHistory();

    const handleDateStartChange = (date) => {
        setSelectedStartDate(date);
    };
    const handleDateEndChange = (date) => {
        setSelectedEndDate(date);
    };

    function random_rgba() {
        var o = Math.round, r = Math.random, s = 255;
        return 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',' + r().toFixed(1) + ')';
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

        let plannedHoursArr = []
        let randomColors = []
        data.categories.forEach(cat => {
            plannedHoursArr.push(data.plannedHours[cat])
            randomColors.push(random_rgba())
        })
        let actualHoursArr = []
        data.categories.forEach(cat => {
            actualHoursArr.push(data.actualHours[cat])
        })
        setRandomColors(randomColors)


        console.log(randomColors)


        setPiePlannedData({
            datasets: [{
                data: plannedHoursArr,
                backgroundColor: randomColors
            }],
            labels: data.categories
            
        })
        setPieActualData({
            datasets: [{
                data: actualHoursArr,
                backgroundColor: randomColors
            }],
            labels: data.categories
        })
        setBarData({
            labels: data.categories,
            datasets: [
                {
                    label: 'Planned Hours',
                    data: plannedHoursArr,
                    backgroundColor: randomColors
                },
                {
                    label: 'Actual Hours',
                    data: actualHoursArr,
                    backgroundColor: randomColors
                }
            ]
        })
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
                    <Grid container justify="center" style={{ marginTop: "30px" }}>
                        <div>
                            <Card style={{ padding: "30px", margin: "30px" }}>
                                <Pie
                                    data={piePlannedData}
                                    width={500}
                                    height={400}
                                    backgroundColor= {randomColors}
                                    options={{
                                        title: {
                                            display: true,
                                            text: 'Planned Hours Breakdown',
                                            fontSize: 25
                                        },
                                        legend: {
                                            display: true,
                                            position: 'right'
                                        },
                                        maintainAspectRatio: false
                                    }}
                                />
                            </Card>
                        </div>
                        <div>
                            <Card style={{ padding: "30px", margin: "30px" }}>
                                <Pie
                                    data={pieActualData}
                                    width={500}
                                    height={400}

                                    options={{
                                        title: {
                                            display: true,
                                            text: 'Actual Hours Breakdown',
                                            fontSize: 25
                                        },
                                        legend: {
                                            display: true,
                                            position: 'right'
                                        },
                                        maintainAspectRatio: false
                                    }}
                                />
                            </Card>
                        </div>

                    </Grid>
                    <Grid container justify="center" style={{ marginTop: "30px" }}>
                        <Card style={{ padding: "30px", margin: "30px" }}>
                            <Bar
                                data={barData}
                                width={600}
                                height={300}

                                options={{
                                    title: {
                                        display: true,
                                        text: 'Hours Planned vs Actual',
                                        fontSize: 25
                                    },
                                    scales: {
                                        yAxes: [{
                                            ticks: {
                                                min: 0,
                                                stepSize: 1
                                            }
                                        }

                                        ]
                                    },
                                    maintainAspectRatio: false
                                }}
                            />
                        </Card>
                    </Grid>
                </div>
                :
                <></>
            }
        </>
    )
}

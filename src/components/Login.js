/* eslint-disable */ 

import React, {useState} from 'react'
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { FormControl } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useHistory } from 'react-router-dom';

export const Login = ({setUser}) => {
    const [emailId, setEmailId] = useState("");
    const [emailPass, setEmailPass] = useState("");
    // const [msg, setMsg] = useState("");
    const [showLoader, setShowLoader] = useState(false);
    const history = useHistory();

    const handleButtonClick = async (e) => {
        e.preventDefault();
        setShowLoader(true);
        
        const response = await fetch('https://dashboard-strapi-backend.herokuapp.com/auth/local', 
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                identifier: emailId,
                password: emailPass
            })
        } 
        );
        const content = await response.json();
        setUser(content);
        history.push("/dashboard");
        console.log(content);
    }
    return (
        <>
        {showLoader ? 
        <>
        
        <div>Logging in... </div>
        <div><CircularProgress style={{margin: "100px"}}/></div>
        
        </>
        : 
        <Paper style={{paddingTop:"50px", paddingBottom:"50px"}}>
            <h2 >Please Login!</h2>
            
            <FormControl size="medium" style={{width:"500px"}}>
            <TextField name="emailId" required id="required-email" label="Email Id" margin="dense" style={{padding: "10px"}}
            onChange={ e => setEmailId(e.target.value)}
            />
            <TextField
                name="emailPass"
                required
                id="password-input"
                label="Password"
                type="password"
                margin="dense" style={{padding: "10px"}}
                onChange={ e => setEmailPass(e.target.value)}
            />
            <Button variant="contained" color="primary" style={{padding: "10px", marginBottom:"30px"}}
            onClick={(e) => handleButtonClick(e)}
            >
                Login
            </Button>
            </FormControl>
        </Paper>
        }
        </>
    )
}

import React, {useState, useEffect} from 'react'
import { useHistory } from 'react-router-dom';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
import JobTable from './subcomponents/JobTable'

export const Job = ({user}) => {
    const [loggedinUser, setLoggedinUser] = useState(user);
    const [data, setData] = useState([]);
    const history = useHistory();

    const getData = async () => {
        const response = await fetch('https://dashboard-strapi-backend.herokuapp.com/jobs/getAll', 
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${user.jwt}`
            }
        } 
        );
        const content = await response.json();
        setData(content);
        console.log(content)
    }
    useEffect( () => {
        if(Object.keys(user).length == 0){
            history.push('/login')
        }
        else{
            getData();
        }
    },[loggedinUser])

    
    const listData = data.length > 0 ? 

            <Container >
                <JobTable data={data} user={loggedinUser}/>
            </Container>
    : 
    <Container maxWidth="sm"><CircularProgress /></Container>

    return (
        <>
        {Object.keys(user).length > 0 ? 
        <div>
            Job Applications for {loggedinUser.user.username}
            
            {listData}
        </div>
        :
        <></>
        }
        </>
    )
}

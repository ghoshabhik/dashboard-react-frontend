import React, {useState, useEffect} from 'react'
import { useHistory } from 'react-router-dom';

export const Dashboard = ({user}) => {
    const [loggedinUser, setLoggedinUser] = useState(user);
    const history = useHistory();
    useEffect( () => {
        if(Object.keys(user).length == 0){
            history.push('/login')
        }
    },[loggedinUser])
    return (
        <>
        {Object.keys(user).length > 0 ? 
        <div>
            Dashboard for {loggedinUser.user.username}
        </div>
        :
        <></>
        }
        </>
    )
}

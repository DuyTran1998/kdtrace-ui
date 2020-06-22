import React from 'react';
import {Redirect} from 'react-router-dom';

function Home(props){
    const role = props.role;
    console.log(role);
    if(role === 'ROLE_ADMIN'){
        return <Redirect to='/admin' />
    }
    else if(role === 'ROLE_PRODUCER'){
        return <Redirect to="/dashboard" />
    }
    return null;
}export default Home;
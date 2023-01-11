import React, { useState, useEffect } from 'react';

const Dashboard = ({ Set_Auth }) => {

    const [name, setName] = useState('');

    const Get_Name = async () => {
        try 
        {
            console.log("Getting name: client/components/dashboard :: Get_Name()")
            const response = 
                await fetch(
                    'http://localhost:3002/dashboard/',
                    { 'method':'GET', 'headers': { 'token':localStorage.token } }
                );
            const parsed_response = await response.json();
            console.log("Parsed Response: ", parsed_response);
            setName(parsed_response.user_name);
            
        } 
        catch (error) {
            console.error(error.message);
        }
    }

    useEffect( () => {
        Get_Name();
    }, []);

    const Logout = (e) => {
        e.preventDefault();
        console.log("logging out: client/components/dashboard :: Logout()")
        localStorage.removeItem('token');
        Set_Auth(false);
    }

    return (
        <>
            <h1>{name}'s Dashboard </h1>
            <button className='btn btn-primary' onClick={ e => Logout(e) }>Log out</button>
        </>
    )
}

export default Dashboard;
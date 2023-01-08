import React from 'react';

const Dashboard = ({ Set_Auth }) => {
    return (
        <>
            <h1>Dashboard</h1>
            <button onClick={() => Set_Auth(false)}>Log Out</button>
        </>
    )
}

export default Dashboard;
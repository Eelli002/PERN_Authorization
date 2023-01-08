import React from 'react';

const Login = ({ Set_Auth }) => {
    return (
        <>
            <h1>Login</h1>
            <button onClick={ () => Set_Auth(true) }>Authenticate</button>
        </>
    )
}

export default Login;
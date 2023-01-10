import React, {useState} from 'react';
import { Link } from 'react-router-dom';

const Login = ({ Set_Auth }) => {

    const [inputs, set_inputs] = useState({ email: '', password:''});

    const {email, password} = inputs;

    const On_Change = e => set_inputs({...inputs, [e.target.name]: e.target.value});

    const On_Sumbit_Form = async e => {
        e.preventDefault();
        try
        {
            const body = { email, password };
            const response = 
                await fetch(
                    'http://localhost:3002/auth/login', 
                    { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify(body) }
                )
            const parsed_response = await response.json();
            localStorage.setItem('token', parsed_response['token']);
            Set_Auth(true);
        }
        catch (error) {
            // console.error(error.message);
            console.error("Error: Client/login : On_Sumbit_Form()");
        }
    }

    return (
        <>
            <h1 className='text-center my-5'>Login</h1>
            <form onSubmit={On_Sumbit_Form}>
                <input 
                    type='email'
                    name='email'
                    placeholder='email'
                    className='form-control my-3'
                    value={email}
                    onChange={ e => On_Change(e) }
                />
                <input 
                    type='password'
                    name='password'
                    placeholder='password'
                    className='form-control my-3'
                    value={password}
                    onChange={ e => On_Change(e) }
                />
                <button className='btn-success btn-block'>Submit</button>
            </form>
            Not a member?
            <Link to='/register'> Register here</Link>
        </>
    )
}

export default Login;
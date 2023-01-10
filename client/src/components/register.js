import React, {useState} from 'react';
import { Link } from 'react-router-dom';

const Register = ({Set_Auth}) => {

    const [inputs, set_inputs] = useState({ name:'', email:'', password:'' });

    const { name, email, password } = inputs;

    const onChange = e => set_inputs({ ...inputs, [e.target.name] : e.target.value });
    // Take inputs and change state of name to value.     ie: name:"Elijah"(value)

    const On_Submit_Form = async e => {
        e.preventDefault();
        try 
        {
            const body = { name, email, password }
            const response = 
                await fetch(
                    'http://localhost:3002/auth/register', 
                    { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(body)} 
                )
            const parsed_response = await response.json();
            localStorage.setItem('token', parsed_response['token']);
            Set_Auth(true);
        } 
        catch (error) {
            console.error(error.message)
        }
    }

    return (
        <>
            <h1 className='text-center my-5'>Register</h1>
            <form onSubmit={On_Submit_Form}>
                <input 
                    type='text' 
                    name='name' 
                    placeholder='name' 
                    className='form-control my-3' 
                    value={name}
                    onChange={ e => onChange(e) }
                />
                <input 
                    type='email' 
                    name='email' 
                    placeholder='email' 
                    className='form-control my-3'
                    value={email}
                    onChange={ e => onChange(e) }
                />
                <input 
                    type='password' 
                    name='password' 
                    placeholder='password' 
                    className='form-control my-3'
                    value={password}
                    onChange={ e => onChange(e) }
                />
                <button className='btn-success btn-block'>Submit</button>
            </form>
            Already a member?
            <Link to='/login'> Log in now</Link>
        </>
    );
}

export default Register;
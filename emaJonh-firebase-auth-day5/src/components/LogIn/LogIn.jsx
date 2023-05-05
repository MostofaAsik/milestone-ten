import React, { useState } from 'react';
import './LogIn.css'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../providers/AuthProviders';

const LogIn = () => {
    const [show, setShow] = useState(false)


    const [error, setError] = useState('');
    const navigate = useNavigate();
    const location = useLocation()
    console.log(location);

    const from = location.state?.form?.pathname || '/'

    const { signIn } = useContext(AuthContext)
    const handleSignIn = (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        signIn(email, password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);
                form.reset();
                navigate(from, { replace: true })
            })
            .catch(error => {
                console.log(error);
                setError(error.message)
            })


    }

    return (
        <div className='form-container'>
            <h2 className='form-title'>Please LogIn</h2>
            <form onSubmit={handleSignIn}>
                <div className="form-control">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" placeholder="Enter Email" required />
                </div>
                <div className="form-control">
                    <label htmlFor="password">Password</label>
                    <input type={show ? "text" : "password"} name="password" placeholder="Enter Password" required />
                    <p onClick={() => setShow(!show)}>
                        <small>
                            {
                                show ? <span>Hide Password</span> : <span>Show Password</span>
                            }
                        </small>
                    </p>
                </div>
                <input className='btn-submit' type="submit" value="LogIn" />
            </form>
            <p><small>New to Ema-John ? <Link to='/signup'>Create New account</Link> </small></p>

            <p>{error}</p>
        </div>
    );
};

export default LogIn;
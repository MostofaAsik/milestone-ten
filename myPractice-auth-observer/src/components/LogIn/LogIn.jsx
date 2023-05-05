import React, { useContext } from 'react';
import './Login.css'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';

const LogIn = () => {
    const { signIn } = useContext(AuthContext);
    const navigate = useNavigate()

    const location = useLocation()
    const from = location.state?.from?.pathname || '/'
    console.log(location)

    const handleLogin = (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        signIn(email, password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);

                //reset form
                form.reset();
                //navigate to
                navigate(from, { replace: true })
            })
            .catch(error => {
                console.log(error.message);
            })
    }

    return (
        <div className='form-container'>
            <h2 className='form-title'>Please LogIn</h2>
            <form onSubmit={handleLogin}>
                <div className="form-control">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" placeholder="Enter Email" required />
                </div>
                <div className="form-control">
                    <label htmlFor="password">Password</label>
                    <input type='password' name="password" placeholder="Enter Password" required />

                </div>
                <input className='btn-submit' type="submit" value="LogIn" />
            </form>
            <p><small>New to website? <Link to='/signup'>SignUp</Link></small></p>

        </div>
    );
};

export default LogIn;
import React, { useContext, useState } from 'react';
import './SignUp.css'
import { Link, parsePath } from "react-router-dom";
import { AuthContext } from '../providers/AuthProviders';

const SignUp = () => {
    const [error, setError] = useState('')

    const { createUser } = useContext(AuthContext)
    const handleSignUp = (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        const confirm = form.confirm.value;
        console.log(email, password, confirm);

        setError('')
        if (password !== confirm) {
            setError('Password not Matched')
            return;
        }
        else if (password.length < 6) {
            setError('Password must be 6 Charecter')
            return;
        }

        createUser(email, password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);
                form.reset();
            })
            .catch(error => {
                console.log(error);
                setError(error.message)
            })


    }


    return (
        <div className='form-container'>
            <h2 className='form-title'>Please SignUp</h2>
            <form onSubmit={handleSignUp}>
                <div className="form-control">
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" placeholder="Enter Email" required />
                </div>
                <div className="form-control">
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" placeholder="Enter Password" required />
                </div>
                <div className="form-control">
                    <label htmlFor="confirm">Confirm Password</label>
                    <input type="password" name="confirm" placeholder="Enter Confirm Password" required />
                </div>
                <input className='btn-submit' type="submit" value="SignUp" />

            </form>

            <p><small>Already have an Acoount? <Link to='/login'>Login</Link> </small></p>

            <p className='text-error'>{error.message}</p>

        </div>
    );
};

export default SignUp;
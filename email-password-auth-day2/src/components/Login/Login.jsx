import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useEffect, useRef, useState } from 'react';
import app from '../../firebase/firebase.config';
import { Link } from 'react-router-dom';
import { Alert } from 'bootstrap';


const auth = getAuth(app)

const Login = () => {
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const emailRef = useRef();

    const handleLogin = event => {
        event.preventDefault();

        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log(email, password);
        //validation
        setError('')
        setSuccess('')
        if (!/(?=.*[A-Z].*[A-Z])/.test(password)) {
            setError('Please Add at least two upperCae');
            return;
        }
        else if (!/(?=.*[!@#$&*])/.test(password)) {
            setError('Please Add a special charecters')
            return;
        }
        else if (password.lengh < 6) {
            setError('Password must be 6 Charecter')
            return;
        }

        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                const logedUser = result.user;
                console.log(result.user);
                setSuccess('Successfully Login')
                setError('')
            })
            .catch(error => {
                console.log(error.message);
                setError(error.message)
            })
    }

    const handleResetPassword = event => {
        console.log(emailRef.current.value);
        const email = emailRef.current.value;
        if (!email) {
            alert("Please insert your Email")
            return;
        }
        sendPasswordResetEmail(auth, email)
            .then(() => {
                alert('Plaese Check Your Email')
            })
            .catch(error => {
                console.log(error);
                setError(error.message)
            })
    }


    return (
        <div>
            <h2>Please Login</h2>
            <form onSubmit={handleLogin}>
                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input type="email" name='name' ref={emailRef} className="form-control mb-3" id="email" aria-describedby="emailHelp" placeholder="Enter email" required />

                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" name='password' className="form-control mb-3" id="password" placeholder="Password" required />
                </div>
                <div className="form-group form-check">
                    <input type="checkbox" className="form-check-input" id="rememberMe" />
                    <label className="form-check-label" htmlFor="rememberMe">Remember me</label>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            <p><small>Forget Password?<button onClick={handleResetPassword} className='btn btn-link'>Reset Password</button></small></p>
            <p><small>New to website?<Link to='/register'>Register</Link></small></p>
            <p className='text-danger'>{error}</p>
            <p className='text-success'>{success}</p>
        </div>
    );
};

export default Login;
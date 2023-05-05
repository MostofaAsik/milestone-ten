import { getAuth, sendPasswordResetEmail, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useDebugValue, useState } from 'react';
import app from '../../firebase/firebase.config';
import { Link } from 'react-router-dom';
import { useRef } from 'react';
const auth = getAuth(app)

const Login = () => {
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [show, setShow] = useState(false)  //for showing password
    const emailRef = useRef();

    const handleLogin = (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value
        const password = form.password.value;
        setError('')
        setSuccess('')

        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);
                setSuccess('You are Successfuly Login')
                setError('')
            })
            .catch(error => {
                console.log(error.message);
                setError(error.message)
            })

    }

    const handleReset = (event) => {
        console.log(emailRef.current.value);
        const email = emailRef.current.value;
        if (!email) {
            alert('To reset your Password please provide a Email')
            return;
        }
        sendPasswordResetEmail(auth, email)
            .then(() => {
                alert('Check Your Email')

            })
            .catch(error => {
                console.log(error.message);
            })


    }
    return (
        <div>
            <h3>Please Login Here</h3>
            <form onSubmit={handleLogin} >
                <input type="email" name="email" ref={emailRef} id="email" placeholder='Enter your Email' required />
                <br /><br />

                <input type={show ? 'text' : 'password'} name="password" id="password" placeholder='Enter your Password' required />

                <p onClick={() => setShow(!show)}> <small>
                    {
                        show ? <span>Hide Password</span> : <span>Show Password</span>
                    }
                </small>
                </p>

                <br /><br />
                <p className='textP'>{error}</p>
                <p className='textP'>{success}</p>
                <input type="submit" value="Login" className='submit' />
            </form>
            <p>Forget Password? <Link onClick={handleReset}>Reset Password</Link></p>
            <p>If you new? Please <Link to='/register'>Register</Link></p>
        </div>
    );
};

export default Login;
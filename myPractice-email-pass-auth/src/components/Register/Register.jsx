import React, { useState } from 'react';
import './Register.css'
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification } from "firebase/auth";
import app from '../../firebase/firebase.config';
import { FaBeer } from 'react-icons/fa';
import { Link } from 'react-router-dom';


const Register = () => {
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('');

    const auth = getAuth(app)


    const handleSubmit = (event) => {
        event.preventDefault();
        //preSuccess setSuccess empty string
        setSuccess('');
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        //validaton
        if (!/(?=.*[A-Z])/.test(password)) {
            setError('Add at least One UPPERCASE')
            return;
        }
        else if (password.length < 6) {
            setError('Minimum Six Charecter')
            return;
        }


        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);
                form.reset()   //form reset
                setError('');  //after created successfuly thats why empty string;
                setSuccess("You are successfully crated an account")
                emailVerification(loggedUser)
            })
            .catch(error => {
                console.log(error.message)
                // setError(error.message)
            })
    }

    const emailVerification = user => {
        sendEmailVerification(user)
            .then(result => {
                console.log(result);
                alert('Verify Your Email')
            })
    }
    return (
        <div>

            <h3>Please Register Here</h3>
            <form onSubmit={handleSubmit} >
                <input type="email" name="email" id="email" placeholder='Enter your Email' required />
                <br /><br />

                <input type="password" name="password" id="password" placeholder='Enter your Password' required />
                <br /><br />
                <p className='textP'> {error}</p>
                <p className='textP'> {success}</p>
                <input type="submit" value="Register" className='submit' />
            </form>
            <p>Already have an Account? Please <Link to='/login'>Login</Link></p>
        </div>
    );
};

export default Register;
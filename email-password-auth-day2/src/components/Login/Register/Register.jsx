import React, { useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, updateProfile } from "firebase/auth";
import app from '../../../firebase/firebase.config';
import { Link } from 'react-router-dom';

const auth = getAuth(app)

const Register = () => {
    const [email, setEmail] = useState('')

    //error
    const [error, setEror] = useState('')
    //succcess message
    const [success, setSuccess] = useState('')
    const handleSubmit = (event) => {
        event.preventDefault();

        setSuccess('')
        setEror('')
        const email = event.target.email.value;
        const password = event.target.password.value;
        const name = event.target.name.value
        console.log(name, email, password);


        //validation
        if (!/(?=.*[A-Z])/.test(password)) {
            setEror('please add at least one uppercase')
            return;
        }
        else if (!/(?=.*[0-9].*[0-9])/.test(password)) {
            setEror('please add at least two numbers')
            return;
        }
        else if (password.length < 6) {
            setEror('minimum six charecter')
            return;
        }

        createUserWithEmailAndPassword(auth, email, password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);
                setEror('')
                event.target.reset()
                setSuccess('You are Succesfully Register')
                sendVerificatonEmail(result.user)
                updateUserData(result.user, name)
            })
            .catch(error => {
                console.error(error.message)
                setEror(error.message)
            })

    }


    const sendVerificatonEmail = (user) => {
        sendEmailVerification(user)
            .then(result => {
                console.log(result);
                alert('Please verify your address')
            })
    }

    const updateUserData = (user, name) => {
        updateProfile(user, {
            displayName: name
        })
            .then(() => {
                console.log('User Name Updated')
            })
            .catch(error => {
                setEror(error.message)
            })
    }


    const handleEmailChange = (event) => {
        // console.log(event.target.value);
        setEmail(event.target.value)
    }
    const handlePassword = (event) => {
        // console.log(event.target.value);
    }

    return (
        <div>
            <h2> Please Register</h2>
            <form onSubmit={handleSubmit}>
                <input className='w-50 mb-4 ps-2' type="text" name="name" id="name" placeholder='Display Name' required />
                <br />
                <input className='w-50 mb-4 ps-2' onChange={handleEmailChange} type="email" name="email" id="email" placeholder='Your Email' required />
                <br />
                <input className='w-50 mb-4 ps-2' onBlur={handlePassword} type="password" name="password" id="password" placeholder='Your Password' required />
                <br />
                <input className='btn btn-primary' type="submit" value="Register" />
            </form>
            <p><small>Already have an account?Please<Link to='/login'>LogIn</Link></small></p>
            <p className='text-danger'>{error}</p>
            <p className='text-danger'>{success}</p>
        </div>
    );
};

export default Register;
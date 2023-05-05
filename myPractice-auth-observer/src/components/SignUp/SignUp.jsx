import React, { useContext, useState } from 'react';
import './SignUp.css'
import { Link } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';
import { sendEmailVerification } from 'firebase/auth';

const SignUp = () => {
    const [error, setError] = useState('')

    const { createUser } = useContext(AuthContext)
    const handleSignUp = (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value
        const password = form.password.value
        const confirm = form.confirm.value
        console.log(email, password, confirm);

        setError('')

        if (password !== confirm) {
            setError("Password didn't match")
            return;
        }
        else if (password.length < 6) {
            setError('Password must be 6 Charecters')
            return;
        }

        createUser(email, password)
            .then(result => {
                const loggedUser = result.user;
                console.log(loggedUser);

                //verification email
                // emailverification(loggedUser)

                //Reset form
                form.reset()
            })
            .catch(error => {
                console.log(error.message);
                setError(error.message)
            })

    }

    //Email Verification
    // const emailverification = (curentUser) => {
    //     sendEmailVerification(curentUser)
    //         .then(result => {
    //             console.log(result);
    //             alert('Verify Your Email')
    //         })
    // }

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
                    <input type='password' name="password" placeholder="Enter Password" required />

                </div>
                <div className="form-control">
                    <label htmlFor="confirm">Confirm Password</label>
                    <input type='password' name="confirm" placeholder="Enter Password" required />

                </div>
                <p>{error}</p>
                <input className='btn-submit' type="submit" value="SignUp" />


            </form>
            <p><small>Already have an account? <Link to='/login'>Login</Link></small></p>
        </div>
    );
};

export default SignUp;
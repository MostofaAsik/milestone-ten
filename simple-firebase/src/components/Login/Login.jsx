import React, { useState } from 'react';
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import app from '../../firebase/firebase.init';

const Login = () => {

    const [user, setUser] = useState(null)
    const auth = getAuth(app);
    // console.log(app);
    const provider = new GoogleAuthProvider();

    const handleGoogleSignIn = () => {
        signInWithPopup(auth, provider)
            .then(result => {
                const loggedInUser = result.user
                console.log(loggedInUser);
                setUser(loggedInUser)
            })
            .catch(error => {
                console.log('error', error.message);
            })
    }
    return (
        <div>
            <button onClick={handleGoogleSignIn}>Google LogIn </button>
            {user &&
                <div>
                    <h2>User:{user.displayName}</h2>
                    <h3>Email:{user.email}</h3>
                    <img src={user.photoURL} alt="" />


                </div>
            }
        </div>
    );
};

export default Login;
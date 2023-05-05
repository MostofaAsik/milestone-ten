import React from 'react';
import app from '../../firebase/firebase.init';
import { GithubAuthProvider, GoogleAuthProvider, getAuth, signInWithPopup, signOut } from "firebase/auth";
import { useState } from 'react';


const Login = () => {

    const [user, setUser] = useState(null)
    const auth = getAuth(app)

    const googleProvider = new GoogleAuthProvider();
    const githubProvider = new GithubAuthProvider()


    const handleGoogleSignIn = () => {
        signInWithPopup(auth, googleProvider)
            .then(result => {
                const loggedInUser = result.user;
                console.log(loggedInUser);
                setUser(loggedInUser)
            })
            .catch(error => {
                console.log("error", error.message);
            })
    }

    const handleGithubSignIn = () => {
        signInWithPopup(auth, githubProvider)
            .then(result => {
                const loggedUser = result.user;
                setUser(loggedUser)
            })
            .catch(error => {
                console.log(error);
            })
    }




    const handleSignOut = () => {
        signOut(auth)
            .then(result => {
                console.log(result);
                setUser(null)
            })
            .catch(error => {
                console.log("error", error.message);
            })
    }




    return (
        <div>

            {/* use?sign out:login */}


            {user ? <button onClick={handleSignOut}>Google Sign Out</button>
                : <>
                    <button onClick={handleGoogleSignIn}>Google Login</button>
                    <button onClick={handleGithubSignIn}>Github LogIn</button>
                </>
            }
            {user && <div>
                <h3>User: {user.displayName}</h3>
                <h2>Email:{user.email}</h2>
                <img src={user.photoURL} alt="" />
            </div>
            }
        </div>
    );
};

export default Login;
import { useState } from 'react'

import './App.css'
import { GithubAuthProvider, GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import app from './firebase/firebase.config';


const auth = getAuth(app)
const googleProvider = new GoogleAuthProvider()

const githubProvider = new GithubAuthProvider()

function App() {

  const [user, setUser] = useState(null)

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleProvider)
      .then(result => {
        const loggedUser = result.user;
        console.log(loggedUser);
        setUser(loggedUser)

      })
      .catch(error => {
        console.log(error);
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

  return (
    <div className="App">

      <h1>Firebase + React</h1>
      <button onClick={handleGoogleSignIn}> Google Sign In</button>
      <button onClick={handleGithubSignIn}> Github Sign In</button>
      {user &&
        <div className="card">
          <h1>name:{user.displayName}</h1>
          <h2>Email:{user.email}</h2>
          <img src={user.photoURL} alt="" />
        </div>}

    </div>
  )
}

export default App

import React, { useState } from 'react';
import {GithubAuthProvider, GoogleAuthProvider, getAuth, signInWithPopup, signOut} from 'firebase/auth'
import app from '../../firebase.init';


const Login = () => {
    const [user, setUser] = useState(null)
    const auth = getAuth(app)
    console.log(app)
    const googleProvider = new GoogleAuthProvider()
    const githubProvider = new GithubAuthProvider()
    const handleGoogleSignIn = () => {
        signInWithPopup(auth, googleProvider)
            .then(result => {
                const loggedInUser = result.user;
                console.log(loggedInUser)
                setUser(loggedInUser)
        })
            .catch(error => {
            console.log('error', error.message)
        })
    }
    const handleSignOut = () => {
        signOut(auth)
            .then(result => {
            console.log(result)
            setUser(null)
            })
            .catch(error => {
            console.log(error)
        })
  }
  const handleGithubSingIn = () => {
    signInWithPopup(auth, githubProvider)
      .then(result => {
        const loggedUser = result.user;
        console.log(loggedUser)
        setUser(loggedUser)
      })
      .catch(error => {
          console.log(error)
      })
  }
    return (
      <div>
        {/* user ? logOut : signOut */}
        {user ? (
          <button onClick={handleSignOut}>Sign out Out</button>
        ) : (
          <>
                        <button onClick={handleGoogleSignIn}>Google sign i n  Login</button>
                        <button onClick={handleGithubSingIn}>Github Login</button>
          </>
        )}
        {user && (
          <div>
            <h1>User : {user.displayName}</h1>
            <p>Email : {user.email}</p>
            <img src={user.photoURL} alt="" />
          </div>
        )}
      </div>
    );
};

export default Login;
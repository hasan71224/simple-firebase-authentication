import logo from './logo.svg';
import './App.css';
import app from './firebase.init';

import { getAuth, GithubAuthProvider, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { useState } from 'react';

const auth = getAuth(app)

function App() {
  const [user, setUser] = useState({})
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();

  const handleGoogleSignin = () =>{
    signInWithPopup(auth, googleProvider)
    .then (result =>{
      const user = result.user;
      setUser(user);
      console.log(user);
    })
    .catch(error =>{
      console.log("Error: ",error);
    })
    
  }
  const handleSignOut = () =>{
    signOut(auth)
    .then(()=>{
      setUser({})
    })
    .catch(error =>{
      setUser({})
    })
  }
  const handleGithubSignin = () =>{
    signInWithPopup(auth, githubProvider)
    .then(result =>{
      const user = result.user;
      setUser(user)
      console.log(user);
    })
    .catch(error=>{
      console.log("ERROR:",error);
    })
  }
  return (
    <div className="App">
      {
        user.uid ? <button onClick={handleSignOut}>Sign Out</button>
        :
        <>
          <button onClick={handleGoogleSignin}>Google sign in</button>
          <button onClick={handleGithubSignin}>Github Sign in</button>
        </>
      }

      <h1>Name: {user.displayName}</h1>
      <p>Email: {user.email}</p>
      <img src={user.photoURL} alt="" />
      <br />
    </div>
  );
}

export default App;

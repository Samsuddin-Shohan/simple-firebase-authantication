import { GoogleAuthProvider,GithubAuthProvider  } from "firebase/auth";
import './App.css';
import initializeAuthentication from './Firebase/firebase.initialize';
import { getAuth, signInWithPopup,signOut } from "firebase/auth";
import { useState } from "react";

initializeAuthentication();
const googleprovider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();
const auth = getAuth();


function App() {
  const [user,setUser] = useState({});
  const handleGoogleSignIn = ()=>{
    signInWithPopup(auth, googleprovider)
    .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    // const credential = GoogleAuthProvider.credentialFromResult(result);
    // const token = credential.accessToken;
    // The signed-in user info.
    const people = result.user;
    const {displayName,email,photoURL} = people;
    setUser({
      name: displayName,
      email: email,
      photo: photoURL
    });
  })
  }
  const handleGithubSignIn = ()=>{
    signInWithPopup(auth, githubProvider)
    .then((result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    // const credential = GoogleAuthProvider.credentialFromResult(result);
    // const token = credential.accessToken;
    // The signed-in user info.
    const people = result.user;
    const {displayName,email,photoURL} = people;
    setUser({
      name: displayName,
      email: email,
      photo: photoURL
    });
    // ...
  })
  }
  const handleSignOut = ()=>{
    signOut(auth).then(() => {
      setUser({});
    })
  }
  return (
    <div className="App">
    {
      !user.name?<div> <button onClick={handleGoogleSignIn}>Google Sign in</button>
      <button onClick={handleGithubSignIn}>Github Sign in</button></div>:<button onClick={handleSignOut}>Sign Out</button>
    }
      
     {
       user.name && <div> <h2>Name: {user.name}</h2>
       <p>Email: {user.email}</p>
       <img src={user.photo} alt="" /></div>
     }
    </div>
  );
}

export default App;

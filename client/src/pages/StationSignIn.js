
import React, { useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';

import { signInWithEmailAndPassword } from "firebase/auth";
import { useHistory } from 'react-router-dom';
import './StationSignIn.css'; // Import your CSS file
import {app, db, auth} from '../config/firebase-config'



const SigninComponent = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const history = useHistory();

  const handleSignin = async () => {
    try {
      if (!email || !password) {
        setError('Please fill in all fields');
        return;
      }

      signInWithEmailAndPassword(auth, email, password)
        .then(async () => {
          const user = auth.currentUser;
          if (user) {
            const userDoc = doc(db, 'station', user.uid);
            const docSnapshot = await getDoc(userDoc);

            if (docSnapshot.exists()) {
              console.log(user.uid)
              history.push('/station/dashboard', { uid: user.uid });
              window.location.reload();
            } else {
              setError('Access denied. Not a station user.');
              // Sign out the user if not found in the station collection
              await auth.signOut();
            }
          }
        })
        .catch((error) => {
          setError(error.message);
        });
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="signin-container">
      <h1>Sign into your Station Account</h1>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className="input-field"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        className="input-field"
      />
      <button onClick={handleSignin} className="signin-btn">Sign In</button>
      {error && <p className="error-msg">{error}</p>}
    </div>
  );
};

export default SigninComponent;

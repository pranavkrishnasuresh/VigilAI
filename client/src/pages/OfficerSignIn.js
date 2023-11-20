
import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { useHistory } from 'react-router-dom';
import './StationSignIn.css'; // Import your CSS file

const firebaseConfig = {
    apiKey: "AIzaSyBXfdfqeqq1k2VnTJBMchSL1eZ2qXvt-6Y",
    authDomain: "vigilai-110d5.firebaseapp.com",
    projectId: "vigilai-110d5",
    storageBucket: "vigilai-110d5.appspot.com",
    messagingSenderId: "823347750616",
    appId: "1:823347750616:web:ba5d09b28573f4848ed9ad",
    measurementId: "G-7LHL0DJKMK"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

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
        .then(() => {
          history.push('/officer/dashboard');
          window.location.reload(); // You might not need to reload the page
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
      <h1>Sign into your Officer Account</h1>
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

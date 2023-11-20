import React, { useState } from 'react';
import axios from 'axios';
import './StationSignUp.css'; // Import your CSS file
import {useHistory} from "react-router-dom";

const SignupComponent = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const history = useHistory(); 

  const handleSignup = async () => {
    try {
      await axios.post('http://localhost:3001/auth/station/signup', {
        name,
        email,
        password,
      });

      history.push('/station/dashboard');
      window.location.reload();


    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="signup-container">
      <input
        className="input-field"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
      />
      <input
        className="input-field"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        className="input-field"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button className="signup-button" onClick={handleSignup}>Sign Up</button>
    </div>
  );
};

export default SignupComponent;

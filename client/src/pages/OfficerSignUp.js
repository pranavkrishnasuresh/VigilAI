import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './OfficerSignUp.css'; // Import your CSS file

function OfficerSignUp() {
  const { uid } = useParams(); // Get the UID from the URL params
  const [formDetails, setFormDetails] = useState({
    name: '',
    email: '',
    password: '',
    stationID: uid,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/auth/officer/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formDetails),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Officer created:', data);
        // Handle success or redirect as needed
      } else {
        throw new Error('Failed to create officer');
      }
    } catch (error) {
      console.error('Error creating officer:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormDetails({
      ...formDetails,
      [name]: value,
    });
  };

  return (
    <div className="officer-signup-container">
      <h1>Officer Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" onChange={handleInputChange} />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" onChange={handleInputChange} />
        </div>
        <button type="submit" className="submit-btn">
          Create Officer
        </button>
      </form>
    </div>
  );
}

export default OfficerSignUp;

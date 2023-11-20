import React from 'react';
import { useHistory } from 'react-router-dom';
import './DefaultComponent.css'; // Import your CSS file

const DefaultComponent = () => {
  const history = useHistory();

  const handleStationAccount = () => {
    history.push('/station/signin');
    window.location.reload();
  };

  const handleOfficerAccount = () => {
    history.push('/officer/signin');
    window.location.reload();
  };

  return (
    <div className="container">
      <h1 className="title">Choose an Account Type:</h1>
      <button className="station-btn" onClick={handleStationAccount}>Station Account</button>
      <button className="officer-btn" onClick={handleOfficerAccount}>Officer Account</button>
    </div>
  );
};

export default DefaultComponent;

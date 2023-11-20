import React, { useState } from "react";
import "./OfficerSettings.css"; // Import your CSS file for styling
import rand_dude from '../images/rand_dude.png';

const OfficerSettings = ({ name, id, img, calibrationClip }) => {
  // Model
  const [user, setUser] = useState({
    name: name,
    profileImageURL: img,
  });

  const [calibration, setCalibration] = useState({
    clip: calibrationClip,
  });

  const [isEditingName, setIsEditingName] = useState(false);

  // Controller Actions

  // When user types in text field
  const onChangeName = (event) => {
    const newName = event.target.value;

    setUser((prevUser) => ({
      ...prevUser,
      name: newName,
    }));
  };

  const startEditingName = () => {
    setIsEditingName(true);
  };

  const finishEditingName = () => {
    setIsEditingName(false);
  };

  // When user uploads a profile picture
  const onUploadProfilePicture = (event) => {
    const newProfilePicture = event.target.files[0];

    setUser((prevUser) => ({
      ...prevUser,
      profileImageURL: URL.createObjectURL(newProfilePicture),
    }));
  };

  // When user uploads a calibration clip
  const onUploadCalibrationClip = (event) => {
    const newClip = event.target.files[0];

    setCalibration({
      clip: newClip,
    });
  };

  // View
  return (
    <div className="OfficerSettings">
      <h1>{user.name || "Officer"}'s Profile</h1>

      <div className="profile-section">
        <img 
        className="profile-image" 
        src={rand_dude}
        alt="random dude"
        //{user.profileImageURL || '../images/rand_dude.png'}
        /> 
        <div className="profile-info">
          {isEditingName ? (
            <input
              type="text"
              value={user.name}
              onChange={onChangeName}
              onBlur={finishEditingName}
              autoFocus
            />
          ) : (
            <p className="profile-info-item" onClick={startEditingName}>
              Name: {user.name}
            </p>
          )}
          <p className="profile-info-item">ID: {id}</p>
        </div>
      </div>

      <div className="upload-section">
        <label className="upload-label">
          <span>Upload Profile Picture:</span>
          <input type="file" accept="image/*" onChange={onUploadProfilePicture} />
        </label>

        <label className="upload-label">
          <span>Upload Calibration Clip:</span>
          <input type="file" accept=".mp4" onChange={onUploadCalibrationClip} />
        </label>
      </div>

      <div className="calibration-section">
        <span>Calibration Clip:</span>
        {calibration.clip ? (
          <p>{calibration.clip.name}</p>
        ) : (
          <p>No calibration clip uploaded</p>
        )}
      </div>
    </div>
  );
};

export default OfficerSettings;

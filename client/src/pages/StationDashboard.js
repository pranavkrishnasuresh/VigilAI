import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import './StationDashboard.css'; // Import your CSS file

function StationCopAnalysis() {
  const history = useHistory();
  const [inviteLink, setInviteLink] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [officers, setOfficers] = useState([]);

  const handleAdd = () => {
    console.log(history.location)
    setInviteLink(`localhost:3000/officer/signup?stationUid=${history.location.state.uid}`);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(inviteLink);
    // You can add a message or notification for successful copy
  };

  const handleTextShare = () => {
    // Logic to share the link through text (using external libraries or native functionalities)
  };

  useEffect(() => {
    // Fetch officers data
    fetch('http://localhost:3001/station/getAllOfficers')
      .then(response => response.json())
      .then(data => {
        setOfficers(data); // Update officers state with fetched data
      })
      .catch(error => console.error('Error fetching officers:', error));
  }, []);

  return (
    <div className="dashboard-container">
      <h2>Officers within the Station</h2>
      <div className="officers-list">
        {/* Display officers */}
        {officers.map((officer, index) => (
          <Link to={`/officer/${officer.id}`} key={index} className="officer-item">
            {officer.name}
          </Link>
        ))}
      </div>
      <button onClick={handleAdd} className="add-officer-btn">
        Add a New Officer
      </button>
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <span className="close-modal" onClick={handleCloseModal}>
              &times;
            </span>
            <h3>Share Invitation Link</h3>
            <p>Share this invitation link:</p>
            <input type="text" value={inviteLink} readOnly className="invite-link-input" />
            <div className="modal-buttons">
              <button onClick={copyToClipboard} className="modal-btn">
                Copy Link
              </button>
              <button onClick={handleTextShare} className="modal-btn">
                Share via Text
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default StationCopAnalysis;

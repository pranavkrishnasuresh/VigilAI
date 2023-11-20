
import React, { useState, useEffect } from 'react';
import ReportCard from '../components/ReportCard';
import './StationDashboard.css'; // Import your CSS file

function StationCopAnalysis() {
  const [reportData, setReportData] = useState([]);
  const [quizData, setQuizData] = useState([]);
  const [showModal, setShowModal] = useState(false); // State to manage modal visibility
  const [reportDetails, setReportDetails] = useState({
    name: '',
    date: '',
    number: '',
    video: null,
  });

  useEffect(() => {
    // Fetch data using a GET request for reports
    fetch('http://localhost:3001/station/reports') // Replace with your API endpoint for reports
      .then(response => response.json())
      .then(data => setReportData(data))
      .catch(error => console.error('Error fetching reports:', error));

    // Fetch data using a GET request for quizzes
    fetch('http://localhost:3001/station/reports') // Replace with your API endpoint for quizzes
      .then(response => response.json())
      .then(data => setQuizData(data))
      .catch(error => console.error('Error fetching quizzes:', error));
  }, []);

  const handleAddReport = () => {
    setShowModal(true); // Show the modal when "Add Report" is clicked
  };

  const handleCloseModal = () => {
    setShowModal(false); // Close the modal
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReportDetails({
      ...reportDetails,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setReportDetails({
      ...reportDetails,
      video: file,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append('name', reportDetails.name);
    formData.append('date', reportDetails.date);
    formData.append('number', reportDetails.number);
    formData.append('video', reportDetails.video);
  
    try {
      const response = await fetch('http://localhost:3001/station/addReport', {
        method: 'POST',
        body: formData,
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('Report submitted:', data);
        setShowModal(false);
      } else {
        throw new Error('Failed to submit report');
      }
    } catch (error) {
      console.error('Error submitting report:', error);
    }
  };
  

  return (
    <div className="dashboard-container">
      <h2>"Cop Name's" Reports</h2>
      <div className="reports-scroll-container">
        <div className="reports-list">
          {reportData.map((report, index) => (
            <ReportCard
              key={index}
              field1={report.name}
              field2={report.date}
              field3={report.number}
            />
          ))}
        </div>
      </div>
      <button className="add-report-btn" onClick={handleAddReport}>Add Report</button>
      <h2>"Cop Name's" Reports</h2>
      <div className="reports-scroll-container">
        <div className="reports-list">
          {reportData.map((report, index) => (
            <ReportCard
              key={index}
              field1={report.name}
              field2={report.date}
              field3={report.number}
            />
          ))}
        </div>
      </div>
      {/* Modal Overlay */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <span className="close-modal" onClick={handleCloseModal}>&times;</span>
            <h3>Add Report</h3>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="reportName">Name:</label>
                <input type="text" id="reportName" name="name" onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <label htmlFor="reportDate">Date:</label>
                <input type="date" id="reportDate" name="date" onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <label htmlFor="reportNumber">Number:</label>
                <input type="number" id="reportNumber" name="number" onChange={handleInputChange} />
              </div>
              <div className="form-group">
                <label htmlFor="videoUpload">Video Upload:</label>
                <input type="file" id="videoUpload" name="video" accept="video/*" onChange={handleFileChange} />
              </div>
              <button type="submit" className="submit-report-btn">Submit Report</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default StationCopAnalysis;









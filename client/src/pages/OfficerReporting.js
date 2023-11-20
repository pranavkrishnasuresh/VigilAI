import React from 'react'
import axios from 'axios';
import VideoPlayer from '../components/VideoPlayer';

function OfficerReporting({name, date, numIncident, id}) {
  //axios post request to get all reports
  const handleSignup = async () => {
    try {
      await axios.post(`http://localhost:3001/getAllReports/${id}`, {
        name:name, date:date, numIncident:numIncident, id:id
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <VideoPlayer />
    </div>
  )
}

export default OfficerReporting
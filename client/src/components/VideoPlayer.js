import React, { useState, useRef } from 'react';
import ReactPlayer from 'react-player';
import './VideoPlayer.css';

const VideoPlayer = () => {
  const [importantEvents] = useState([
    { time: 10, description: 'Event 1' },
    { time: 30, description: 'Event 2' },
    { time: 50, description: 'Event 3' },
  ]);
  const url = "https://www.youtube.com/watch?v=7dYTw-jAYkY";
  const videoRef = useRef(0.0);
  const [currentTime, setCurrentTime] = useState(null);

  const jumpToTime = (time) => {
    if (videoRef.current) {
      videoRef.current.seekTo(time, 'seconds');
    }
  };

  const updateTimelinePoints = () => {
    const currentTime = videoRef.current.getCurrentTime();
    setCurrentTime(currentTime);

    importantEvents.forEach((event) => {
      const point = document.getElementById(`event-${event.time}`);
      if (point) {
        const isClose = Math.abs(currentTime - event.time) < 2;
        point.style.backgroundColor = isClose ? '#ff5722' : '#4CAF50';
      }
    });
  };

  //testing only, replace with hashmap implementation
  const getDescription = (time) => {
    if (time === 10) {
      return 'Description for Event 1. This is a stylish and amazing description!';
    } else if (time === 30) {
      return 'Description for Event 2. Another stylish and amazing description!';
    } else if (time === 50) {
      return 'Description for Event 3. A description that looks fantastic!';
    }
    // Add more conditions as needed
    return 'Default Description';
  };

  return (
    <div className="video-container">
      <div className="video-wrapper">
        <ReactPlayer
          ref={videoRef}
          url={url}
          controls
          width="100%"
          height="100%"
          onProgress={updateTimelinePoints}
        />
      </div>

      <div className="timeline">
        {importantEvents.map((event) => (
          <div
            key={event.time}
            id={`event-${event.time}`}
            className="event-point"
            onClick={() => jumpToTime(event.time)}
          >
            {`Time: ${event.time}s - ${event.description}`}
          </div>
        ))}
      </div>

      {/* Styled description box */}
      {currentTime !== null && (
        <div className="event-description">
          {getDescription(currentTime)}
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;

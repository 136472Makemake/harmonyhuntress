import React from 'react';

const SongPlayer = ({ audioRef, handlePlay }) => (
  <div style={{ textAlign: 'center' }}> {/* Center the button */}
    {/* Remove the static src attribute from here */}
    <audio ref={audioRef} controls />
    <button onClick={handlePlay} style={{
      cursor: 'pointer',
      width: '100px', // Adjust size as needed
      height: '100px',
      borderRadius: '50%', // Makes the button round
      fontSize: '24px', // Adjust as needed
      color: '#FFFFFF', // Text color
      border: 'none',
      background: '#4CAF50', // Button color, adjust as needed
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      outline: 'none',
      marginTop: '20px', // Add some space above the play button
    }}>
      <svg viewBox="0 0 24 24" width="40" height="40" fill="currentColor"> {/* Triangle icon for play */}
        <path d="M8 5v14l11-7z" />
      </svg>
    </button>
  </div>
);

export default SongPlayer;

import React from 'react';

const SongPlayer = ({ audioRef, handlePlay, playDuration }) => (
  <div style={{ textAlign: 'center' }}> {/* Center the button */}
    <audio ref={audioRef} src="song.mp3" />
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
    }}>
      <svg viewBox="0 0 24 24" width="40" height="40" fill="currentColor"> {/* Adjust SVG size as needed */}
        <path d="M8 5v14l11-7z" /> {/* Triangle path */}
      </svg>
    </button>
  </div>
);

export default SongPlayer;

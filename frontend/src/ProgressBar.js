import React from 'react';

const ProgressBar = ({ duration, maxDuration }) => {
  const controlWidthPercentage = (duration / maxDuration) * 100;

  return (
    <div className="progress-container" style={{ width: '100%', backgroundColor: '#ccc', borderRadius: '10px', overflow: 'hidden' }}>
      <div style={{ width: `${controlWidthPercentage}%`, height: '100%', overflow: 'hidden', position: 'relative' }}>
        <div
          className="progress-bar progress-bar-animated"
          style={{
            width: '100%',
            animationDuration: `${duration}s`,
            animationName: controlWidthPercentage > 0 ? 'fillBar' : 'none',
          }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;

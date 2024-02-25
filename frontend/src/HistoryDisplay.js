// HistoryDisplay.js
import React from 'react';

const HistoryDisplay = ({ history }) => (
  <div className="history">
    {history.map((item, index) => {
      let backgroundColor;
      switch (item.status) {
        case 'correct':
          backgroundColor = '#4CAF50';
          break;
        case 'incorrect':
          backgroundColor = '#f44336';
          break;
        case 'skipped':
        default:
          backgroundColor = '#ccc';
      }

      return (
        <div key={index} className="history-item" style={{ backgroundColor }}>
          {item.guess}
        </div>
      );
    })}
  </div>
);

export default HistoryDisplay;

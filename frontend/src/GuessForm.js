import React from 'react';

const GuessForm = ({ guess, setGuess, handleSubmit }) => (
  <form onSubmit={handleSubmit}>
    <input
      type="text"
      value={guess}
      onChange={(e) => setGuess(e.target.value)}
      placeholder="Guess the song name"
    />
    <button type="submit">Submit Guess</button>
  </form>
);

export default GuessForm;

import React from 'react';

const GuessForm = ({ guess, setGuess, handleSubmit, guessesLeft }) => (
  <form onSubmit={handleSubmit}>
    <input
      disabled={guessesLeft <= 0}
      type="text"
      value={guess}
      onChange={(e) => setGuess(e.target.value)}
      placeholder="Guess the song name"
    />
    <button type="submit" disabled={guessesLeft <= 0}>Submit Guess</button>
  </form>
);

export default GuessForm;

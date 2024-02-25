import React, { useState, useEffect } from 'react';

const GuessForm = ({ guess, setGuess, handleSubmit, guessesLeft, songsList }) => {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (guess) {
      const lowerCaseGuess = guess.toLowerCase();
      const filteredSuggestions = songsList
        .filter(song => song.toLowerCase().includes(lowerCaseGuess))
        .slice(0, 10);
      
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  }, [guess, songsList]);

  return (
    <form onSubmit={handleSubmit}>
      <input
        disabled={guessesLeft <= 0}
        type="text"
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
        placeholder="Guess the song name"
        list="song-suggestions"
      />
      <datalist id="song-suggestions">
        {suggestions.map((song, index) => (
          <option key={index} value={song} />
        ))}
      </datalist>
      <button type="submit" disabled={guessesLeft <= 0}>Submit Guess</button>
    </form>
  );
};

export default GuessForm;

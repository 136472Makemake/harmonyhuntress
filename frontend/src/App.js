import React, { useState, useRef, useEffect } from 'react';
import './App.css';
import SongPlayer from './SongPlayer';
import GuessForm from './GuessForm';
import ProgressBar from './ProgressBar';
import MessageDisplay from './MessageDisplay';
import HistoryDisplay from './HistoryDisplay';

function App() {
  const [guess, setGuess] = useState('');
  const maxDuration = 30;
  const [message, setMessage] = useState('');
  const [playDuration, setPlayDuration] = useState(2);
  const [lastAudioPlayedDuration, setLastAudioPlayedDuration] = useState(0);
  const [guessesLeft, setGuessesLeft] = useState(3); // Total of 3 guesses
  const [progress, setProgress] = useState(0);
  const [history, setHistory] = useState([]); // Track guesses and skips
  const [barKey, setBarKey] = useState(0);
  const [correctAnswer, setCorrectAnswer] = useState(""); // Now stateful to update dynamically
  const audioRef = useRef(null);

  useEffect(() => {
    fetch('http://localhost:5000/random_song')
      .then(response => {
        const contentDisposition = response.headers.get('Content-Disposition');
        let fileName = contentDisposition?.split('filename=')[1]?.split(';')[0]?.replace(/\"/g, '');
        if (fileName) {
          fileName = fileName.replace('.mp3', '');
          setCorrectAnswer(fileName);
        }

        return response.blob();
      })
      .then(blob => {
        const url = URL.createObjectURL(blob);
        if (audioRef.current) {
          audioRef.current.src = url;
        }
      })
      .catch(error => console.error('Error fetching the song:', error));
  }, []); 
  
  useEffect(() => {
    const updateProgress = () => {
      if (audioRef.current) {
        const progress = (audioRef.current.currentTime / playDuration) * 100;
        setProgress(progress);
      }
    };
    
    audioRef.current.addEventListener('timeupdate', updateProgress);
    return () => audioRef.current.removeEventListener('timeupdate', updateProgress);
  }, [playDuration]);

  const handlePlay = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
      setLastAudioPlayedDuration(playDuration);
      setBarKey(prevKey => prevKey + 1);
      setTimeout(() => {
        audioRef.current.pause();
      }, playDuration * 1000);
    }
  };

  const handleSkip = () => {
    if (guessesLeft > 1) {
      const skippedItem = {
        guess: 'Skipped',
        status: 'skipped'
      };
      
      setHistory(history => [...history, skippedItem]);
      updateGuessesAndDuration();
    } else {
      setMessage("No more guesses left. You've lost.");
      setPlayDuration(0);
      setGuessesLeft(0);
    }
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const isCorrect = guess.toLowerCase() === correctAnswer.toLowerCase();
    
    // Add the guess and its status to the history
    const historyItem = {
      guess: guess, // The guess made by the user
      status: isCorrect ? 'correct' : 'incorrect' // The status based on correctness
    };
    
    setHistory(history => [...history, historyItem]);
    
    // Handle the guess being correct
    if (isCorrect) {
      setMessage("Correct! Well done.");
      setPlayDuration(0); // No more playing needed
      setGuessesLeft(0);
    } else {
      // If the guess is incorrect, possibly update the play duration and guesses left
      updateGuessesAndDuration();
    }
    
    // Reset the guess input field
    setGuess('');
  };

  const updateGuessesAndDuration = () => {
    const newDuration = playDuration === 2 ? 5 : playDuration === 5 ? 30 : 0;
    setGuessesLeft(guessesLeft - 1);
    if (newDuration === 0 || guessesLeft <= 1) {
      setMessage("Incorrect. You've lost.");
      setPlayDuration(0);
    } else {
      setMessage(`Incorrect. You can now listen to ${newDuration} more seconds.`);
      setPlayDuration(newDuration);
    }
  };

  return (
    <div className="App">
      <button onClick={handleSkip}>Skip Attempt</button>
      <GuessForm guess={guess} setGuess={setGuess} handleSubmit={handleSubmit} />
      <ProgressBar duration={lastAudioPlayedDuration} maxDuration={maxDuration} key={barKey}/>
      <SongPlayer audioRef={audioRef} handlePlay={handlePlay} playDuration={playDuration} />
      <MessageDisplay message={message} />
      <HistoryDisplay history={history} />
    </div>
  );
}

export default App;

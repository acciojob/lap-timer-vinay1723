import React, { useState, useRef } from "react";
import "./../styles/App.css";

const App = () => {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const timeRef = useRef(null);
  const [laps, setLaps] = useState([]);
  const [showLaps, setShowLaps] = useState(false);
  function formatTime() {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliSec = Math.floor((time % 1000) / 10);

    return (
      String(minutes).padStart(2, "0") +
      ":" +
      String(seconds).padStart(2, "0") +
      ":" +
      String(milliSec).padStart(2, "0")
    );
  }

  function startTimer() {
    if (!running) {
      setRunning((running) => !running);
      timeRef.current = setInterval(() => {
        setTime((prev) => prev + 10);
      }, 10);
    }
  }

  function stopTimer() {
    if (running) {
      setRunning((running) => !running);
      clearInterval(timeRef.current);
    }
  }

  function handleShowLaps() {
    setShowLaps(true);
    setLaps((laps) => [...laps, formatTime()]);
  }

  function handleReset() {
    setTime(0);
    clearInterval(timeRef.current);
    setRunning(false);
    setLaps([]);
  }

  return (
    <div>
      <p>{formatTime()}</p>
      <button onClick={startTimer}>Start</button>
      <button onClick={stopTimer}>Stop</button>
      <button onClick={handleShowLaps}>Lap</button>
      <button onClick={handleReset}>Reset</button>
      <ul>
        {showLaps && laps.map((lap, index) => <li key={index}>{lap}</li>)}
      </ul>
    </div>
  );
};

export default App;

import React, { useState, useEffect } from 'react';

const Stopwatch = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    let interval = null;
    if (isRunning) {
      setStartTime(Date.now() - currentTime);
      interval = setInterval(() => {
        setCurrentTime(Date.now() - startTime);
      }, 10); // Update every 10 milliseconds for accuracy
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning, startTime, currentTime]);

  const startPauseTimer = () => {
    setIsRunning(!isRunning);
  };

  const stopTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setCurrentTime(0);
  };

  const formatTime = (time) => {
    // Format time into minutes, seconds, and milliseconds
    const minutes = Math.floor(time / 60000);
    const seconds = ((time % 60000) / 1000).toFixed(2);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="stopwatch">
      <h1>Stopwatch</h1>
      <div className="stopwatch-display">{formatTime(currentTime)}</div>
      <div className="stopwatch-controls">
        {!isRunning ? (
          <button onClick={startPauseTimer}>Start</button>
        ) : (
          <button onClick={startPauseTimer}>Pause</button>
        )}
        <button onClick={stopTimer} disabled={!isRunning}>
          Stop
        </button>
        <button onClick={resetTimer} disabled={isRunning}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default Stopwatch;

'use client';

import { useState, useEffect } from 'react';

const Timer = () => {
  const [time, setTime] = useState(0); // seconds
  const [isRunning, setIsRunning] = useState(false);
  
  
  useEffect(() => {
    if (isRunning && time > 0) {
      const interval = setInterval(() => {
        setTime(prevTime => prevTime - 1);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isRunning, time]);

  const handleStartPause = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setTime(0);
  };

  const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTime(Number(event.target.value) * 60);
  };

  const formatTime = () => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-800 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-white mb-4">Countdown Timer</h2>
      <div className="text-4xl text-green-400 mb-6">{formatTime()}</div>
      
      <input
        type="number"
        className="p-2 mb-4 border rounded text-center w-20 bg-gray-700 text-white"
        placeholder="Minutes"
        onChange={handleTimeChange}
        disabled={isRunning}
      />

      <div className="space-x-4">
        <button
          onClick={handleStartPause}
          className={`px-4 py-2 font-semibold text-white rounded ${
            isRunning ? 'bg-red-500' : 'bg-blue-500'
          } hover:bg-opacity-75`}
        >
          {isRunning ? 'Pause' : 'Start'}
        </button>
        <button
          onClick={handleReset}
          className="px-4 py-2 font-semibold text-white bg-yellow-500 rounded hover:bg-opacity-75"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default Timer;

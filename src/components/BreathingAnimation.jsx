import React, { useState, useEffect, useRef } from 'react';
import '../Pages/BreathingAnimation.css'; // Import your CSS for the animation
import audio from './audio.mp3';
import { useNavigate } from 'react-router-dom';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Registering necessary components
ChartJS.register(ArcElement, Tooltip, Legend);

const BreathingPage = () => {
  const navigate = useNavigate();
  const audioRef = useRef(new Audio(audio));
  
  // State variables for breathing session
  const [isBreathing, setIsBreathing] = useState(false);
  const [milliseconds, setMilliseconds] = useState(0);
  const [showChart, setShowChart] = useState(false);

  // UseEffect to play audio
  useEffect(() => {
    if (isBreathing) {
      audioRef.current.play().catch((error) => {
        console.error("Error playing audio:", error);
      });
    } else {
      audioRef.current.pause();
      audioRef.current.currentTime = 0; // Reset audio to start
    }

    return () => {
      audioRef.current.pause();
      audioRef.current.currentTime = 0; // Reset audio to start on unmount
    };
  }, [isBreathing]);

  // Function to navigate back
  const handleClose = (e) => {
    e.preventDefault();
    navigate('/'); // This takes the user back to the previous page
    console.log("Navigating to previous page");
  };

  // Timer to keep track of daily activity
  useEffect(() => {
    let interval = null;
    if (isBreathing) {
      interval = setInterval(() => {
        setMilliseconds((prev) => prev + 100); // Increment by 100 ms
      }, 100);
    } else if (!isBreathing && milliseconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isBreathing, milliseconds]);

  const handleStartBreathing = () => {
    setIsBreathing(true);
    setMilliseconds(0); // Reset timer
    setShowChart(false); // Hide chart when starting
    console.log("Breathing session started");
  };

  const handleStopBreathing = () => {
    setIsBreathing(false);
    storeBreathingSession(milliseconds);
    setShowChart(true); // Show chart after stopping
    console.log("Breathing session stopped. Duration:", milliseconds);
  };

  const formatTime = (ms) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const remainingSeconds = totalSeconds % 60;
    const remainingMilliseconds = ms % 1000;
    return `${minutes}m ${remainingSeconds}s ${remainingMilliseconds}ms`;
  };

  // Keeping track of breathing history
  const storeBreathingSession = (duration) => {
    const history = JSON.parse(localStorage.getItem('breathingHistory')) || [];
    const today = new Date().toLocaleDateString();
  
    // Check if today's entry exists
    const todayEntry = history.find(entry => entry.date === today);
    
    if (todayEntry) {
      todayEntry.totalMilliseconds += duration;
    } else {
      history.push({ date: today, totalMilliseconds: duration });
    }
  
    localStorage.setItem('breathingHistory', JSON.stringify(history));
  };
  
  // Visualizing data in doughnut chart
  const BreathingHistoryChart = () => {
    const history = JSON.parse(localStorage.getItem('breathingHistory')) || [];
    
    const data = {
      labels: history.map(entry => entry.date),
      datasets: [
        {
          data: history.map(entry => entry.totalMilliseconds),
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        },
      ],
    };

    const total = data.datasets[0].data.reduce((acc, val) => acc + val, 0);
    
    // Show total time for the current session
    const sessionTime = milliseconds;

    return (
      <Doughnut 
        data={{
          labels: [...history.map(entry => entry.date), 'Current Session'],
          datasets: [{
            data: [...history.map(entry => entry.totalMilliseconds), sessionTime],
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#FFCE56'], // Reuse color for the current session
          }],
        }} 
        options={{
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: true,
              position: 'bottom',
            },
          },
        }} 
      />
    );
  };

  return (
    <div className="breathing-page flex flex-col items-center justify-center h-screen">
      <h2 className="text-3xl mb-4">Breathing Exercise</h2>

      <div className="flex flex-row space-x-8">
        <div className="flex flex-col items-center">
          <div className="flex space-x-4 mb-4">
            <button
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
              onClick={handleStartBreathing}
            >
              Start Breathing
            </button>
            <button
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
              onClick={handleStopBreathing}
            >
              Stop Breathing
            </button>
          </div>
          <div className="text-xl mb-4">{formatTime(milliseconds)}</div>

          {/* Circle Animation Section */}
          <div className={`circle-animation mb-4 ${isBreathing ? 'animate' : ''}`}>
            <div className="circle circle1"></div>
            <div className="circle circle2"></div>
            <div className="circle circle3"></div>
            <div className="circle circle4"></div>
            <div className="circle circle5"></div>
          </div>
        </div>

        {showChart && ( // Only render the chart when showChart is true
          <div className="chart-container">
            <BreathingHistoryChart />
          </div>
        )}
      </div>

      <button
        className="close-button bg-gray-300 hover:bg-gray-400 text-black font-bold py-2 px-4 rounded shadow-lg transition duration-300 ease-in-out transform hover:scale-105 mt-4"
        style={{ cursor: "pointer" }}
        onClick={handleClose}
      >
        Close
      </button>
    </div>
  );
};

export default BreathingPage;

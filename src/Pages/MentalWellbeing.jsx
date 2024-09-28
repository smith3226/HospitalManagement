import React, { useRef, useState } from 'react';
import userImg from '../components/img/images.jpg'; // Replace with your image path
import { FaVideo } from 'react-icons/fa'; // Video call icon
import { HiSearch } from 'react-icons/hi'; // Search icon 
import { AiOutlineBell } from 'react-icons/ai'; // Notification icon
import { FaHeartbeat, FaSpa, FaSmile } from 'react-icons/fa';
import Calendar from 'react-calendar'; 
import {useNavigate} from 'react-router-dom';

// css files

import 'react-calendar/dist/Calendar.css'; // Import calendar styles
import './Calendar.css'; 
import './BreathingAnimation.css';

import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';



// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const MentalHealth = () => {
  const [date, setDate] = useState(new Date());
  const userName = "John Doe"; // Replace with dynamic user name
  const [view, setView] = useState('daily');
  const today = new Date();
  
  // State to manage tasks
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState('');
  const [timeInput, setTimeInput] = useState('');
  const [selectedDate, setSelectedDate] = useState(null);

  //state to manage breathing

  const navigate = useNavigate();

  const handleBreathingClick = () => {
    navigate('/breathing'); // Navigate to the BreathingPage
  };
  
  

  // Static data for daily graph
  const dailyData = {
    labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    datasets: [
      {
        label: 'Daily Progress',
        data: [40, 65, 59, 80, 81, 56, 55], // Example data for all days
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Static data for monthly graph
  const monthlyData = {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    datasets: [
      {
        label: 'Monthly Progress',
        data: [120, 130, 80, 150],
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  // Function to handle adding a task
  const handleAddTask = (e) => {
    e.preventDefault();
    if (taskInput && timeInput && selectedDate) {
      const selectedDateTime = new Date(selectedDate);
      // Only allow adding tasks for today or future dates
      if (selectedDateTime >= today) {
        setTasks([...tasks, { task: taskInput, time: timeInput, date: selectedDate }]);
        setTaskInput('');
        setTimeInput('');
      } else {
        alert("You cannot add tasks for past dates.");
      }
    }
  };



  

  return (
    <div className="flex flex-col lg:flex-row h-screen">
        
      {/* Left Section (30% Width) */}
      <div className="lg:w-1/3 bg-cover bg-center flex flex-col items-center justify-start p-6" style={{ backgroundImage: "url('path_to_your_vector_background.svg')" }}>
        <div className="mt-16 flex flex-col items-center">
          <img src={userImg} alt="user" className="rounded-full w-32 h-32 mb-6" />
          <h2 className="text-2xl font-bold mb-2">Check Your Conditions</h2>
          <p className="text-center mb-4">It's important to assess your mental health regularly. Click below to begin.</p>
          {/* <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">Check Now</button> */}


          {/* Three buttons for mindful activities */}
          <div className="flex flex-col items-center space-y-4">
          <div className="breathing-container">
      <button
        className="bg-gradient-to-r from-green-400 to-blue-500 text-white font-semibold py-3 px-6 rounded-lg flex items-center w-60 justify-center transition-all duration-300 shadow-lg transform hover:scale-105"
        onClick={handleBreathingClick}
      >
        <FaHeartbeat className="mr-2 text-xl" />
        <span>Take a Breath</span>
      </button>
    </div>


            <button
              className="bg-gradient-to-r from-purple-400 to-pink-500 hover:from-purple-500 hover:to-pink-600 text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center w-60 transition-all duration-300 shadow-lg transform hover:scale-105"
              onClick={() => alert('Meditation Started: Close your eyes and breathe deeply.')}
            >
              <FaSpa className="mr-2 text-xl" />
              <span>Start Meditation</span>
            </button>

            <button
              className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center w-60 transition-all duration-300 shadow-lg transform hover:scale-105"
              onClick={() => alert('Affirmation: You are strong and capable!')}
            >
              <FaSmile className="mr-2 text-xl" />
              <span>Get Affirmation</span>
            </button>
        </div>
      </div>
      </div>
      

      {/* Right Section (70% Width) */}
      <div className="h-full lg:w-2/3 flex flex-col p-6 bg-gray-100">
        {/* Top Section */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Hi, {userName}</h2>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input type="text" placeholder="Search..." className="border rounded p-2" />
              <HiSearch className="absolute top-1/2 transform -translate-y-1/2 right-2 text-gray-500" />
            </div>
            <AiOutlineBell className="text-2xl cursor-pointer" />
            <img src={userImg} alt="user" className="rounded-full w-10 h-10" />
          </div>
        </div>

        {/* Main Content Section */}
        <div className="flex flex-grow">
          {/* Left Section (60%) */}
          <div className="w-3/5 p-4">
            <h3 className="text-lg font-semibold mb-4">Upcoming Appointments</h3>
            <div className="bg-white shadow-md rounded p-4 mb-4 flex items-center justify-between">
              <div className="flex items-center">
                <FaVideo className="text-blue-500 mr-2" />
                <div>
                  <h4 className="font-bold">Dr. Jane Smith</h4>
                  <p>March 20, 2024, 3:00 PM</p>
                </div>
              </div>
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-3 rounded">Join Call</button>
            </div>

            {/* Daily Progress Bar Graph */}
            <h3 className="text-lg font-semibold mb-4">Daily Progress</h3>
            <div className="bg-white shadow-md rounded p-4 mb-4">
              <Bar data={view === 'daily' ? dailyData : monthlyData} options={options} />
              <div className="flex justify-between mt-4">
                <button onClick={() => setView('daily')} className={`border rounded p-2 ${view === 'daily' ? 'bg-blue-500 text-white' : ''}`}>
                  Daily
                </button>
                <button onClick={() => setView('monthly')} className={`border rounded p-2 ${view === 'monthly' ? 'bg-blue-500 text-white' : ''}`}>
                  Monthly
                </button>
              </div>
            </div>
          </div>

          {/* Right Section (40%) */}
          <div className="w-2/5 p-4">
            <h3 className="text-lg font-semibold mb-4">Schedule Your Day</h3>
            <div className="bg-white shadow-md rounded-lg p-4 mb-4">
            <Calendar
  onChange={(newDate) => {
    setDate(newDate);
    setSelectedDate(newDate);
  }}
  value={date}
  tileClassName={({ date, view }) => {
    // Today's date should always have the green border
    if (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    ) {
      // If today is also the selected date, apply both classes
      if (
        selectedDate &&
        date.getDate() === selectedDate.getDate() &&
        date.getMonth() === selectedDate.getMonth() &&
        date.getFullYear() === selectedDate.getFullYear()
      ) {
        return 'react-calendar__tile--now react-calendar__tile--active'; // Both classes for today + selected
      }
      return 'react-calendar__tile--now'; // Only today
    }

    // If it's just the selected date, apply only the active class
    if (
      selectedDate &&
      date.getDate() === selectedDate.getDate() &&
      date.getMonth() === selectedDate.getMonth() &&
      date.getFullYear() === selectedDate.getFullYear()
    ) {
      return 'react-calendar__tile--active';
    }

    // Normal weekend behavior (ensure no red)
    if (date.getDay() === 0 || date.getDay() === 6) {
      return 'react-calendar__month-view__days__day--weekend';
    }

    return null;
  }}
  formatShortWeekday={(locale, date) => {
    const weekdays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    return weekdays[date.getDay()];
  }}
/>

            </div>

            {/* Task Input Form */}
            {selectedDate && (
              <form onSubmit={handleAddTask} className="bg-white shadow-md rounded p-4 mt-4">
                <h4 className="font-semibold mb-2">Add Task for {selectedDate.toDateString()}</h4>
                <input
                  type="text"
                  placeholder="Task"
                  value={taskInput}
                  onChange={(e) => setTaskInput(e.target.value)}
                  className="border rounded p-2 mb-2 w-full"
                  required
                />
                <input
                  type="time"
                  value={timeInput}
                  onChange={(e) => setTimeInput(e.target.value)}
                  className="border rounded p-2 mb-2 w-full"
                  required
                />
                <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded w-full">
                  Add Task
                </button>
              </form>
            )}

            {/* List of Scheduled Tasks */}
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">Scheduled Tasks</h3>
              {tasks.length > 0 ? (
                <ul>
                  {tasks.map((task, index) => (
                    <li key={index} className="bg-white shadow-md rounded p-2 mb-2">
                      {task.task} at {task.time} on {new Date(task.date).toDateString()}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No tasks scheduled.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
    
    
  );
};

export default MentalHealth;

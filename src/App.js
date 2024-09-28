import './index.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import AppContext from './context/Context';
import HomePage from './Pages/HomePage';
import MentalHealth from './Pages/MentalWellbeing.jsx'; 
import AllDoctors from './Pages/AllDoctors.jsx';
import HealthScore from './Pages/HealthScore.jsx';
import BreathingPage from './components/BreathingAnimation.jsx';
// import AllDoctors from './Pages/AllDoctors'; 
// import MoodLog from './Pages/MoodLog'; // Import Mood Log component

function App() {
  return (
    <Router>
      <AppContext>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/mentalwellbeing" element={<MentalHealth />} />
          <Route path="/alldoctors" element={<AllDoctors/>} />
          <Route path="/healthscore" element={<HealthScore/>}/>
          <Route path="/breathing" element={<BreathingPage />} />
          {/* Add more routes as needed */}
        </Routes>
      </AppContext>
    </Router>
  );
}

export default App;

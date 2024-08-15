import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import MentorList from './pages/MentorList';
import StudentProfile from './pages/StudentProfile';
import PaymentPage from './pages/PaymentPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/mentors" element={<MentorList />} />
          <Route path="/student-profile" element={<StudentProfile />} />
          <Route path="/payment" element={<PaymentPage />} />
        </Routes>
      </div>
    </Router>
  );
}

// src/App.js
// import React from 'react';
// import StudentForm from './pages/StudentForm';

// function App() {
//     return (
//         <div className="App">
//             <h1>1x1 Scheduler</h1>
//             <StudentForm />
//         </div>
//     );
// }

export default App;




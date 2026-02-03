import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Home from './pages/Home';
import Education from './pages/Education';
import SocialMedia from './pages/SocialMedia';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/education" element={<Education />} />
          <Route path="/social" element={<SocialMedia />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

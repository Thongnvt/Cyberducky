
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import DecalLaptop from './components/DecalLaptop/DecalLaptop';
import { Link } from 'react-router-dom';
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/decal-laptop" element={<DecalLaptop />} />
      </Routes>
    </Router>
  );
};

export default App;

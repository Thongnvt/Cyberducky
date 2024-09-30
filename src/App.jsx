
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import HomePage from './components/HomePage/HomePage';
import DecalLaptop from './components/DecalLaptop/DecalLaptop';
import AboutUsPage from './components/AboutUsPage/AboutUs';
import LoginPage from './components/LoginPage/LoginPage';
import Register from './components/LoginPage/Register';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import KeycapSet from './components/KeycapSet/KeycapSet'
import SingleKeycap from './components/SingleKeycap/SingleKeycap'
import Articles from './components/Articles/Articles'



const App = () => {
  return (
    <Router>
      <div>
        <Header />
        <Routes>




          <Route path="/" element={<HomePage />} />
          <Route path="/decal-laptop" element={<DecalLaptop />} />
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="/account" element={<LoginPage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/keycaps-set" element={<KeycapSet />} />
          <Route path="/keycaps-single" element={<SingleKeycap />} />
          <Route path="/articles" element={<Articles />} />

        </Routes>
        <Footer />
      </div>
    </Router>
  );
};
export default App;
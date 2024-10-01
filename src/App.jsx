// src/App.jsx

import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import HomePage from './components/HomePage/HomePage';
import DecalLaptop from './components/DecalLaptop/DecalLaptop';
import AboutUsPage from './components/AboutUsPage/AboutUs';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import KeycapSet from './components/KeycapSet/KeycapSet';
import SingleKeycap from './components/SingleKeycap/SingleKeycap';
import Articles from './components/Articles/Articles';
import Cart from './Pages/Cart/Cart';
import SearchModal from './Pages/SearchBar/SearchBar'; // Import the SearchModal component
<<<<<<< HEAD
import SearchResultsPage from './components/searchPageResults/searchPageResults'
=======
>>>>>>> 6f596cdb1f3b4de3443e90aa97b2fd233b6a2942

const App = () => {
  const [isModalOpen, setModalOpen] = useState(false); // State to control modal visibility

  const handleSearchClick = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <Router>
      <div>
        <Header onSearchClick={handleSearchClick} /> {/* Pass the handler to Header */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/decal-laptop" element={<DecalLaptop />} />
          <Route path="/about" element={<AboutUsPage />} />
<<<<<<< HEAD
          <Route path="/login" element={<Login />} />
=======
          <Route path="/account" element={<Login />} />
>>>>>>> 6f596cdb1f3b4de3443e90aa97b2fd233b6a2942
          <Route path="/register" element={<Register />} />
          <Route path="/keycaps-set" element={<KeycapSet />} />
          <Route path="/keycaps-single" element={<SingleKeycap />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/cart" element={<Cart />} />
<<<<<<< HEAD
          <Route path="/search-results" element={<SearchResultsPage />} /> {/* Search results page */}
=======
>>>>>>> 6f596cdb1f3b4de3443e90aa97b2fd233b6a2942
        </Routes>
        <Footer />
        {/* Include the SearchModal and pass props */}
        <SearchModal isOpen={isModalOpen} onClose={handleCloseModal} />
      </div>
    </Router>
  );
};

export default App;

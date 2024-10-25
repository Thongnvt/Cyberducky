import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';

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
import SearchModal from './Pages/SearchBar/SearchBar';
import SearchResultsPage from './components/searchPageResults/searchPageResults';
import { UserProvider } from './Pages/Login/UserContext';
import BreadcrumbComponent from './Pages/BreadCrumb/BreadCrumb';
import ProductDetail from './components/PageDetail/ProductDetail';
import StaffPage from './components/Dashboard/StaffPage';
import Dashboard from './components/Dashboard/Dashboard';
import ManageOrders from './components/Dashboard/ManageOrders';
import ManageCustomers from './components/Dashboard/ManageCustomers';
import { CartProvider } from './Pages/Cart/CartContext';
import UserDetails from './Pages/UserDetail/UserDetail';
import Payment from './components/TransactionDetail/TransactionDetail';
import SuccessPage from './components/TransactionDetail/TransactionSuccess';
import Custom from './Pages/Custom/Custom';
import CancelOrder from './components/TransactionDetail/TransactionCancel';
import CustomSuccess from './Pages/Custom/CustomSuccess';

// Component to render Routes with Breadcrumb
const AppContent = () => {
  const location = useLocation();
  const [isModalOpen, setModalOpen] = useState(false);

  const handleSearchClick = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  // Function to determine breadcrumb items based on the current route
  const getBreadcrumbItems = () => {
    switch (location.pathname) {
      case '/':
        return null;
      case '/decal-laptop':
        return [
          { label: 'Home', path: '/' },
          { label: 'Decal Laptop', path: '/decal-laptop', active: true },
        ];
      case '/about':
        return [
          { label: 'Home', path: '/' },
          { label: 'About Us', path: '/about', active: true },
        ];
      case '/login':
        return [
          { label: 'Home', path: '/' },
          { label: 'Login', path: '/login', active: true },
        ];
      case '/register':
        return [
          { label: 'Home', path: '/' },
          { label: 'Register', path: '/register', active: true },
        ];
      case '/keycaps-set':
        return [
          { label: 'Home', path: '/' },
          { label: 'Keycap Set', path: '/keycaps-set', active: true },
        ];
      case '/keycaps-single':
        return [
          { label: 'Home', path: '/' },
          { label: 'Single Keycap', path: '/keycaps-single', active: true },
        ];
      case '/articles':
        return [
          { label: 'Home', path: '/' },
          { label: 'Articles', path: '/articles', active: true },
        ];
      case '/cart':
        return [
          { label: 'Home', path: '/' },
          { label: 'Cart', path: '/cart', active: true },
        ];
      case '/search-results':
        return [
          { label: 'Home', path: '/' },
          { label: 'Search Results', path: '/search-results', active: true },
        ];
      default:
        return [];
    }
  };

  // Check if the current route is the Staff Page or Dashboard
  const isStaffOrDashboardPage = location.pathname === '/login/staff' || location.pathname === '/dashboard' || location.pathname === '/orders' || location.pathname === '/customers';

  return (
    <div>
      {/* Conditionally render Header only for non-staff and non-dashboard pages */}
      {!isStaffOrDashboardPage && <Header onSearchClick={handleSearchClick} />}

      {/* Conditionally render Breadcrumb only for non-home pages */}
      {location.pathname !== '/' && !isStaffOrDashboardPage && (
        <BreadcrumbComponent items={getBreadcrumbItems()} />
      )}

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/decal-laptop" element={<DecalLaptop />} />
        <Route path="/about" element={<AboutUsPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/keycaps-set" element={<KeycapSet />} />
        <Route path="/keycaps-single" element={<SingleKeycap />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/search-results" element={<SearchResultsPage />} />
        <Route path="/product/:productName" element={<ProductDetail />} />
        <Route path="/login/staff" element={<StaffPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/orders" element={<ManageOrders />} />
        <Route path="/customers" element={<ManageCustomers />} />
        <Route path="/user-details" element={<UserDetails />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/custom" element={<Custom />} />
        <Route path="/cancel-success" element={<CancelOrder />} />
        <Route path="/custom-success" element={<CustomSuccess />} />
      </Routes>

      {/* Conditionally render Footer only for non-staff and non-dashboard pages */}
      {!isStaffOrDashboardPage && <Footer />}

      <SearchModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
};

// Main App Component
const App = () => {
  return (
    <UserProvider>
      <CartProvider>
        <Router>
          <AppContent />
        </Router>
      </CartProvider>
    </UserProvider>
  );
};

export default App;

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header/Header.jsx';
import Footer from './components/Footer/Footer.jsx';
import ProductList from './components/ProductList/ProductList.jsx';
import DarkVariantExample from './components/Carousels/Carousels.jsx';
import Login from './Pages/Login/Login.jsx'; // Account page
import Register from './Pages/Register/Register.jsx'


// Product images
import image1 from './assets/trang chủ/image1.png';
import image2 from './assets/trang chủ/image2.png';
import image3 from './assets/trang chủ/image3.png';
import image4 from './assets/trang chủ/image4.png';
import image5 from './assets/trang chủ/image5.png';
import image6 from './assets/trang chủ/image6.png';
import image7 from './assets/trang chủ/image7.png';
import image8 from './assets/trang chủ/image8.png';
import image9 from './assets/trang chủ/image9.png';
import image10 from './assets/trang chủ/image10.png';
import image11 from './assets/trang chủ/image11.png';
import image12 from './assets/trang chủ/image12.png';

// Sample product data
const newProducts = [
  { name: 'KEYCAPS ĐƠN', price: 'PRICE', image: image1 },
  { name: 'KEYCAPS LẺ', price: 'PRICE', image: image2 },
  { name: 'DECAL', price: 'PRICE', image: image3 },
  { name: 'DECAL', price: 'PRICE', image: image4 }
];

const customKeycaps = [
  { name: 'KEYCAPS CUSTOM 1', price: 'PRICE', image: image5 },
  { name: 'KEYCAPS CUSTOM 2', price: 'PRICE', image: image6 },
  { name: 'KEYCAPS CUSTOM 3', price: 'PRICE', image: image7 },
  { name: 'KEYCAPS CUSTOM 3', price: 'PRICE', image: image8 }
];

const decals = [
  { name: 'DECAL 1', price: 'PRICE', image: image9 },
  { name: 'DECAL 2', price: 'PRICE', image: image10 },
  { name: 'DECAL 3', price: 'PRICE', image: image11 },
  { name: 'DECAL 3', price: 'PRICE', image: image12 }
];

const App = () => {
  return (
    <Router>
      <div>
        <Header />
        <Routes>
          {/* Home Page Route */}
          <Route
            path="/"
            element={
              <div>
                <DarkVariantExample />
                <ProductList title="SẢN PHẨM MỚI" products={newProducts} />
                <ProductList title="KEYCAPS CUSTOM" products={customKeycaps} />
                <ProductList title="DECAL" products={decals} />
              </div>
            }
          />

          {/* Account Page Route */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />



          {/* Add more routes here */}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;

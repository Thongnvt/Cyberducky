import React from 'react';
import Header from '../Header/Header.jsx';  
import Footer from '../Footer/Footer.jsx';
import ProductList from '../ProductList/ProductList.jsx';
import DarkVariantExample from '../Carousels/Carousels.jsx';
import image1 from '../../assets/trang chủ/image1.png';
import image2 from '../../assets/trang chủ/image2.png';
import image3 from '../../assets/trang chủ/image3.png';
import image4 from '../../assets/trang chủ/image4.png';
import image5 from '../../assets/trang chủ/image5.png';
import image6 from '../../assets/trang chủ/image6.png';
import image7 from '../../assets/trang chủ/image7.png';
import image8 from '../../assets/trang chủ/image8.png';
import image9 from '../../assets/trang chủ/image9.png';
import image10 from '../../assets/trang chủ/image10.png';
import image11 from '../../assets/trang chủ/image11.png';
import image12 from '../../assets/trang chủ/image12.png';

const DecalLaptop = () => {
  const newProducts = [
    { name: 'KEYCAP ', price: 'PRICE', image: image1 },
    { name: 'KEYCAP ', price: 'PRICE', image: image2 },
    { name: 'DECAL', price: 'PRICE', image: image3 },
    { name: 'DECAL', price: 'PRICE', image: image4 },
    { name: 'KEYCAP ', price: 'PRICE', image: image5 },
    { name: 'KEYCAP ', price: 'PRICE', image: image6 },
    { name: 'KEYCAP ', price: 'PRICE', image: image7 },
    { name: 'KEYCAP ', price: 'PRICE', image: image8 },
    { name: 'DECAL ', price: 'PRICE', image: image9 },
    { name: 'DECAL ', price: 'PRICE', image: image10 },
    { name: 'DECAL ', price: 'PRICE', image: image11 },
    { name: 'DECAL ', price: 'PRICE', image: image12 }
  ];

  return (
    <div className="decal-laptop">
      <Header />
      <DarkVariantExample />
      <ProductList title="DECAL LAPTOP" products={newProducts} />
      <Footer />
    </div>
  );
};

export default DecalLaptop;
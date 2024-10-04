// HomePage.jsx
import React from 'react';
import ProductList from '../ProductList/ProductList.jsx';
import DarkVariantExample from '../Carousels/Carousels.jsx';



const HomePage = () => {



  return (
    <div className="home-page">

      <DarkVariantExample />
      <ProductList />

    </div>
  );
};

export default HomePage;

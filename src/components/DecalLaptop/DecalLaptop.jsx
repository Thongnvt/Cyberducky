import React from 'react';

import FuildImage from '../DecalLaptop/FuildImage.jsx';
import Pagination from '../DecalLaptop/Pagination.jsx';
import DecalLaptopProduct from '../DecalLaptop/DecalLaptopProduct.jsx';

const DecalLaptop = () => {


  return (
    <div className="decal-laptop">

      <FuildImage />
      <DecalLaptopProduct />
      <Pagination />

    </div>
  );
};

export default DecalLaptop;
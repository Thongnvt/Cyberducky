import React from 'react';

const ProductItem = ({ product }) => {
    return (
        <div className="product-item">
            <div className="productImage">
                <img src={product.image} alt={product.name} />
            </div>
            <h3>{product.name}</h3>
            <p>{product.price} adsdasd</p>
        </div>
    );
};

export default ProductItem;

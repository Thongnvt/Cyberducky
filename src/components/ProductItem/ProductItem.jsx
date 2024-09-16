import React from 'react';

const ProductItem = ({ product }) => {
    return (
        <div className="product-item">
            <div className="product-image">
                <img src={product.image} alt={product.name} />
            </div>
            <h3>{product.name}</h3>
            <p>{product.price}</p>
        </div>
    );
};

export default ProductItem;

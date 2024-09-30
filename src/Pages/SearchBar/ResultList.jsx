// src/components/ResultList.js

import React from 'react';

const ResultList = ({ products }) => {
    if (products.length === 0) return null; // Return null if there are no products

    return (
        <div className="results-container">
            <ul>
                {products.map((product) => (
                    <li key={product.id}>
                        <h3>{product['name-product']}</h3>
                        <p>Price: {product.price} VND</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ResultList;

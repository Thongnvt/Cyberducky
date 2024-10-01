import React, { useState } from 'react';
import Image from 'react-bootstrap/Image';
import './Cart.css';

const CartItem = ({ imageSrc, name, price }) => {
    const [quantity, setQuantity] = useState(1);

    const increaseQuantity = () => setQuantity(quantity + 1);
    const decreaseQuantity = () => {
        if (quantity > 1) setQuantity(quantity - 1);
    };

    return (
        <div className="cart-item">
            <div className="cart-item-image-container">
                <Image src="D:\Fall 2024\exe101\exe101\exe101\src\assets\trang chủ\image4.png" alt={name} className="cart-item-image" thumbnail />
            </div>
            <div className="cart-item-details">
                <h4>{name}</h4>
                <p>{price}đ</p>
            </div>
            <div className="cart-item-quantity">
                <button onClick={decreaseQuantity}>-</button>
                <span>{quantity}</span>
                <button onClick={increaseQuantity}>+</button>
            </div>
        </div>
    );
};

export default CartItem;

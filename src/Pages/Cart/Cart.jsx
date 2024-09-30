// Cart.js
import React from 'react';
import CartItem from './CartItem';
import './Cart.css'

const Cart = () => {
    const items = [
        { id: 1, name: 'Sticker', price: '100.000', imageSrc: 'image1.jpg' },
        { id: 2, name: 'Keycaps PBT', price: '100.000', imageSrc: 'image2.jpg' },
    ];

    return (
        <div className="cart-container">
            <nav className="breadcrumb"></nav>
            <h2>Giỏ Hàng ({items.length} Sản Phẩm)</h2>

            <div className="cart-items">
                {items.map(item => (
                    <CartItem
                        key={item.id}
                        name={item.name}
                        price={item.price}
                        imageSrc={item.imageSrc}
                    />
                ))}
            </div>

            <div className="cart-buttons">
                <button className="checkout-button">THANH TOÁN</button>
                <button className="back-button">VỀ TRANG CHỦ</button>
            </div>
        </div>
    );
};

export default Cart;

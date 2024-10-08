import React, { useContext } from 'react';
import CartItem from './CartItem';
import './Cart.css';
import { CartContext } from './CartContext'; // Import the CartContext
import emptyCartImage from '../../assets/giỏ hàng rõ.png';

const Cart = () => {
    const { cart } = useContext(CartContext); // Get the cart from the context

    // Calculate total price
    const totalPrice = cart.reduce((total, item) => total + item.price, 0);

    return (
        <div className="cart-container">
            <nav className="breadcrumb"></nav>
            <h2>Giỏ Hàng ({cart.length} Sản Phẩm)</h2>

            <div className="cart-items">
                {cart.length > 0 ? (
                    cart.map(item => (
                        <CartItem
                            key={item.id}
                            name={item['name-product']} // Adjust the property name according to your product object
                            price={item.price}
                            imageSrc={item['image-urls'][0]} // Adjust for image
                        />
                    ))
                ) : (
                    <div className="empty-cart">
                        <img src={emptyCartImage} alt="Giỏ hàng rỗng" />
                    </div>
                )}
            </div>

            {cart.length > 0 && (
                <div className="cart-summary">
                    <h3>Tổng Tiền: {totalPrice.toLocaleString()} VND</h3> {/* Display total price */}
                </div>
            )}

            <div className="cart-buttons">
                <button className="checkout-button">THANH TOÁN</button>
                <button className="back-button">VỀ TRANG CHỦ</button>
            </div>
        </div>
    );
};

export default Cart;

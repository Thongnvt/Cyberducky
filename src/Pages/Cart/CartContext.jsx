import React, { createContext, useState, useEffect } from 'react';

// Create the CartContext
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    // Initialize cart from localStorage
    const [cart, setCart] = useState(() => {
        const savedCart = localStorage.getItem('cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    const addToCart = (product) => {
        setCart((prevCart) => {
            const newCart = [...prevCart, product];
            localStorage.setItem('cart', JSON.stringify(newCart)); // Cập nhật localStorage
            return newCart;
        });
    };

    const removeFromCart = (productId) => {
        setCart((prevCart) => {
            const newCart = prevCart.filter(item => item.productId !== productId);
            localStorage.setItem('cart', JSON.stringify(newCart)); // Cập nhật localStorage
            return newCart;
        });
    };


    const clearCart = () => {
        setCart([]);
        localStorage.removeItem('cart');
    };

    // Sync cart with localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    return (
        <CartContext.Provider value={{ cart, setCart, addToCart, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};

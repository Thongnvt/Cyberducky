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
            localStorage.setItem('cart', JSON.stringify(newCart)); // Save to localStorage
            return newCart;
        });
    };

    const removeFromCart = (productId) => {
        setCart((prevCart) => {
            const newCart = prevCart.filter(item => item.id !== productId);
            localStorage.setItem('cart', JSON.stringify(newCart)); // Save to localStorage
            return newCart;
        });
    };
    const clearCart = () => {
        setCart([]); // Clear the cart state
        localStorage.removeItem('cart'); // Clear the cart from local storage
    };


    // Optional: Sync state with localStorage when the component mounts
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};

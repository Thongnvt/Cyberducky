import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    // Initialize user state from localStorage
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    // Function to set user details after login
    const loginUser = (userData) => {
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData)); // Save user data to localStorage
    };

    const logoutUser = () => {
        localStorage.removeItem('user'); // Clear user data from localStorage
        setUser(null); // Clear user state
    };

    return (
        <UserContext.Provider value={{ user, setUser, loginUser, logoutUser }}>
            {children}
        </UserContext.Provider>
    );
};

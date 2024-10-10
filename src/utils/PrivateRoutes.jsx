import React, { useContext } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { UserContext } from '../Pages/Login/UserContext';

// PrivateRoute component to protect routes
const PrivateRoute = ({ element, ...rest }) => {
    const { user } = useContext(UserContext); // Get user data from context

    return (
        <Route
            {...rest}
            element={user ? element : <Navigate to="/login" replace />}
        />
    );
};

export default PrivateRoute;

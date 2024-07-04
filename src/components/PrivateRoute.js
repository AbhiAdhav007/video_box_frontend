import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
// import { AuthContext } from '../context/AuthContext';

const PrivateRoute = ({ children }) => {
    // const { token } = useContext(AuthContext);
    const token = localStorage.getItem('token');
    console.log('user' , token)
    if (!token) {
        return <Navigate to="/login" />;
    }

    return children;
};

export default PrivateRoute;

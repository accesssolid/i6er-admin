
import React from 'react';
import { Navigate } from 'react-router-dom';
import { RouterKeys } from './RouterKeys';
import { useSelector } from 'react-redux';

const ProtectRoute = ({ children, checkAuth = true }) => {
    const accessToken = useSelector((state) => state?.auth?.auth_data?.token)
    // Redirect to login page if the user is not authenticated
    if (checkAuth && !accessToken) {
        return <Navigate to={RouterKeys.AUTH.LOGIN} />;
    }

    // If user is authenticated but trying to access a non-existent route, show 404
    if (!checkAuth && accessToken) {
        return children;
    }

    // Redirect to login if trying to access a non-existent route and not logged in
    if (!checkAuth && !accessToken) {
        return <Navigate to={RouterKeys.AUTH.LOGIN} />;
    }

    return children;
};

export default ProtectRoute;
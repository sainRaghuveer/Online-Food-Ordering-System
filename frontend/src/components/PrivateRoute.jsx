import React from 'react';
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
    const user = JSON.parse(localStorage.getItem('User'))|| null;

    const location = useLocation();
    console.log("PrivateRoteLocation", location);
    if (!user) {
        return <Navigate to={"/"} state={location.pathname} replace></Navigate>
    }
    return children;

}

export default PrivateRoute
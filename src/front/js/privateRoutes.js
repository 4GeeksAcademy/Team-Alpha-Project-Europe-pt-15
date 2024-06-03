import React from "react";
import { Outlet, Navigate } from 'react-router-dom';

export const PrivateRoutes = () => {
    let auth = {'token': localStorage.getItem('jwt-token')}
    return(
        auth.token ? <Outlet/> : <Navigate to="/"/>
    )
}
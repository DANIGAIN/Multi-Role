import { Outlet, Navigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
import { GlobalContext } from '../context';

const PrivateRoute = () => {
    const {user , permission} = useContext(GlobalContext)
    const {name} = useParams();
 
    if (permission.some((data) => data.component.name === name)) {
        return <Outlet />;
    }
    
      return <Navigate to="/" replace />;
};

export default PrivateRoute;
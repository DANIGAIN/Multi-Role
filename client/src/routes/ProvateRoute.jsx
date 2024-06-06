import { Outlet, Navigate } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';

const PrivateRoute = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('/users/profile');
        setUser(response.data.data);
      } catch (error) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser(); 
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (user?.role !== 'Supper-Admin') {
    return <Navigate to="/" replace />;
  }
 

  return <Outlet />;
};

export default PrivateRoute;
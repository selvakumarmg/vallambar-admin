import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const PrivateRoute = ({ isAuthenticated, path, element }) => {
  if (isAuthenticated) {
    return <Route path={path} element={element} />;
  }

  return <Navigate to="/login" replace />;
};

export default PrivateRoute;

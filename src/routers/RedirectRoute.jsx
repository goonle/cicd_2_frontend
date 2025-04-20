import React from 'react';
import { Navigate } from 'react-router-dom';

const RedirectRoute = () => {
  const token = localStorage.getItem("token");

  return token ? <Navigate to="/main" replace /> : <Navigate to="/login" replace />;
};

export default RedirectRoute;
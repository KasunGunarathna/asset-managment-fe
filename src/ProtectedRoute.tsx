import React from 'react';
import {  Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {  selectAuth } from './store/authSlice';
interface ProtectedRouteProps {
    children: React.ReactNode;
  }

const ProtectedRoute: React.FC<ProtectedRouteProps>= ({children }) => {
  const auth = useSelector(selectAuth);

  if (!auth.isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;

import React from 'react';
import { useNavigate, Route, Navigate } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import { clearToken, selectAuth } from './store/authSlice';
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

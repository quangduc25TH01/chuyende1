import React from 'react';
import Loading from 'components/Loading';
import { useAuth } from '../../context/AuthContext';
import { Navigate } from 'react-router-dom';

const RequireAuth: React.FC<{ children: React.ReactNode }> = ({
  children,
}): any => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return <Loading />;

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default RequireAuth;

import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { ContextData } from '../../context/Context';

export const ProtectedRoute = ({ allowedRoles, children }) => {
  const { loggedInUser } = useContext(ContextData);

  // 1. If not logged in at all, kick to login
  if (!loggedInUser) {
    return <Navigate to="/login" replace />;
  }

  // 2. Role-Based Traffic Control
  // Check if the user's role is allowed for the current route
  const isAuthorized = allowedRoles.includes(loggedInUser.role);

  if (!isAuthorized) {
    // If they aren't authorized for this specific route, 
    // send them to their own dedicated dashboard instead.
    if (loggedInUser.role === 'admin') return <Navigate to="/admin" replace />;
    if (loggedInUser.role === 'vendor') return <Navigate to="/vendor" replace />;
    if (loggedInUser.role === 'customer') return <Navigate to="/customer" replace />;
    
    // Fallback if role is unknown
    return <Navigate to="/" replace />;
  }

  // 3. If they are authorized, show the requested page
  return children;
};
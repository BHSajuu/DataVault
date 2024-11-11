import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const ProtectedRoute = ({ roles }) => {
  const { user } = useAuth();

  if (!user) {
    // If not authenticated, redirect to login
    return <Navigate to="/login" replace />;
  }

  if (roles && !roles.includes(user.role)) {
    // If authenticated but lacks necessary role, redirect to home
    return <Navigate to="/" replace />;
  }

  // If authenticated and authorized, render the requested route/component
  return <Outlet />;
};

export default ProtectedRoute;

// frontend/src/components/PrivateRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth.js";

const PrivateRoute = ({ children }) => {
  const { user } = useAuth();
  const isAuthenticated = Boolean(user?.token);
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default PrivateRoute;

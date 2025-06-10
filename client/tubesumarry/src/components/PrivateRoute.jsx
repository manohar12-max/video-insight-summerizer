import React from "react";
import { Navigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useUserContext();

  if (loading) return null; 

  return user ? children : <Navigate to="/auth" replace />;
};

export default PrivateRoute;

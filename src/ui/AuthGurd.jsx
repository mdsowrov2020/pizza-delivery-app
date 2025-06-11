import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AuthGurd = ({ children }) => {
  const username = useSelector((state) => state.user.username);
  return username ? children : <Navigate to="/" replace />;
};

export default AuthGurd;

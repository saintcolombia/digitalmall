// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useStore } from "../store/useStore";

export default function ProtectedRoute({ children }) {
  // check token OR user; this is robust if either is set
  const token = useStore((s) => s.token);
  const user = useStore((s) => s.user);
  const loc = useLocation();

  if (!token && !user) {
    // not authenticated -> redirect to login with the attempted path
    return <Navigate to="/login" state={{ from: loc.pathname }} replace />;
  }

  return children;
}

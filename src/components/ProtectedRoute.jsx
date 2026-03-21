import React from "react";
import { Navigate, useLocation } from "react-router-dom";

/**
 * ProtectedRoute
 * - ប្រសិនបើ token គ្មាន → redirect to /login
 * - ប្រសិនបើ role មិន match allowedRoles → redirect to /dashboard
 *
 * Usage:
 *   <ProtectedRoute allowedRoles={["admin"]}>
 *     <AdminPage />
 *   </ProtectedRoute>
 */
const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const location = useLocation();

  const token = localStorage.getItem("token");
  const role  = localStorage.getItem("role") || "";

  // ── No token → go to login ─────────────────────────────
  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // ── Role not allowed → go to dashboard ────────────────
  if (allowedRoles.length > 0 && !allowedRoles.includes(role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default ProtectedRoute;
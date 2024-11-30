import React from "react";
import { useAuth } from "../../context/auth_context/authContext";
import { Navigate } from "react-router-dom";

const RoleBaseRoute = ({ children, role }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading....</div>;
  }

  if (!user || !role.includes(user.role)) {
    return <Navigate to="/unauthorize" />;
  }

  return children;
};

export default RoleBaseRoute;

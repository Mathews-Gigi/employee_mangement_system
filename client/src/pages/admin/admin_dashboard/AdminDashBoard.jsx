import React from "react";
import { useAuth } from "../../../context/auth_context/authContext";

function AdminDashBoard() {
  const { user } = useAuth();
  return (
    <div className="h-[calc(100vh-80px)] bg-white">
      <div className="lg:px-2 lg:py-2"></div>
    </div>
  );
}

export default AdminDashBoard;

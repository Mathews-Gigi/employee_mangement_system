import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import NavBar from "./components/navbar/NavBar";
import Login from "./pages/login/Login";
import AdminDashBoard from "./pages/admin/admin_dashboard/AdminDashBoard";
import UserDashBoard from "./pages/user/user_dashboard/UserDashBoard";
import PrivateRoute from "./utils/privite_routes/PrivateRoute";
import RoleBaseRoute from "./utils/role_base_route/RoleBaseRoute";
import Department from "./pages/admin/department/Department";
import Leave from "./pages/admin/leave/Leave";
import Employee from "./pages/admin/employee/Employee";
import Salary from "./pages/admin/salary/Salary";
import Settings from "./pages/admin/settings/Settings";

function App() {
  return (
    <>
      <NavBar />
      <div className=" pt-3 md:px-4 lg:px-7">
        <Routes>
          {/* Login Route */}
          <Route path="/login" element={<Login />} />

          {/* Admin Dashboard and Nested Routes */}
          <Route
            path="/admin_dashboard"
            element={
              <PrivateRoute>
                <RoleBaseRoute role={["admin"]}>
                  <AdminDashBoard />
                </RoleBaseRoute>
              </PrivateRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <PrivateRoute>
                <RoleBaseRoute role={["admin"]}>
                  <Settings />
                </RoleBaseRoute>
              </PrivateRoute>
            }
          />
          <Route
            path="/salary"
            element={
              <PrivateRoute>
                <RoleBaseRoute role={["admin"]}>
                  <Salary />
                </RoleBaseRoute>
              </PrivateRoute>
            }
          />
          <Route
            path="/employee"
            element={
              <PrivateRoute>
                <RoleBaseRoute role={["admin"]}>
                  <Employee />
                </RoleBaseRoute>
              </PrivateRoute>
            }
          />
          <Route
            path="/leave"
            element={
              <PrivateRoute>
                <RoleBaseRoute role={["admin"]}>
                  <Leave />
                </RoleBaseRoute>
              </PrivateRoute>
            }
          />
          <Route
            path="/department"
            element={
              <PrivateRoute>
                <RoleBaseRoute role={["admin"]}>
                  <Department />
                </RoleBaseRoute>
              </PrivateRoute>
            }
          />

          {/* User Dashboard */}
          <Route path="/user_dashboard" element={<UserDashBoard />} />

          {/* Unauthorized Route */}
          <Route path="/unauthorize" element={<div>Unauthorized Access</div>} />
        </Routes>
      </div>
    </>
  );
}

export default App;

import axios from "axios";
import React, { useState, createContext, useContext, useEffect } from "react";

const UserContext = createContext();

export const useAuth = () => useContext(UserContext);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Restore user data from localStorage on initial load
  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (token) {
  //     // Optionally, validate token or fetch user data from backend
  //     const savedUser = JSON.parse(localStorage.getItem("user")); // Assuming user data is also stored
  //     if (savedUser) {
  //       setUser(savedUser);
  //     }
  //   }
  // }, []);
  useEffect(() => {
    const handleVerifyUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const response = await axios.get(`http://localhost:8000/verify`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (response.data.success) {
            setUser(response.data.user);
          } else {
            setUser(null);
          }
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error("Verification error:", error);
        setUser(null); // Reset user in case of an error
      } finally {
        setLoading(false); // Ensure loading is set to false
      }
    };
    handleVerifyUser();
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };

  return (
    <UserContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </UserContext.Provider>
  );
};

export default AuthProvider;

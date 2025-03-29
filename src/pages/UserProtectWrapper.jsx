import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UserProtectWrapper = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    const verifyToken = async () => {
      try {
        if (!token) {
          throw new Error("No token found");
        }

        // Make an API call to verify the token
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/auth/verify-token`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          setIsAuthenticated(true); // Token is valid
        } else {
          throw new Error("Invalid token");
        }
      } catch (error) {
        console.error("Token verification failed:", error.message || error);
        localStorage.removeItem("token"); // Remove invalid token
        navigate("/"); // Redirect to login page
      }
    };

    verifyToken();
  }, [token, navigate]);

  if (!isAuthenticated) {
    return null; // Show nothing while verifying the token
  }

  return <>{children}</>;
};

export default UserProtectWrapper;

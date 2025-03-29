import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const LogoutBtn = () => {
  const navigate = useNavigate();
  const { user, logout } = useContext(UserContext); // Use logout from UserContext

  const handleLogout = async () => {
    try {
      await logout(); // Call the logout function from UserContext
      navigate("/"); // Redirect to the login page after logout
    } catch (err) {
      console.error("Logout failed:", err.message || "An error occurred");
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors"
    >
      Logout
    </button>
  );
};

export default LogoutBtn;
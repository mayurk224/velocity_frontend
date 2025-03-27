import React, { useContext, useState } from "react";
import axios from "axios";
import { UserDataContext } from "../context/UserContext";

const AuthForm = () => {
  const ans = useContext(UserDataContext);
  console.log(ans);
  const [isLogin, setIsLogin] = useState(true);
  const [isUser, setIsUser] = useState(true);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    vehicleColor: "",
    vehicleNoPlate: "",
    vehicleCapacity: "",
    vehicleType: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const role = isUser ? "user" : "driver";

    const payload = isUser
      ? {
          email: formData.email,
          password: formData.password,
          ...(isLogin
            ? {}
            : {
                fullName: {
                  firstName: formData.firstName,
                  lastName: formData.lastName,
                },
              }),
        }
      : {
          email: formData.email,
          password: formData.password,
          ...(isLogin
            ? {}
            : {
                fullName: {
                  firstName: formData.firstName,
                  lastName: formData.lastName,
                },
                vehicleColor: formData.vehicleColor,
                vehicleNoPlate: formData.vehicleNoPlate,
                vehicleCapacity: formData.vehicleCapacity,
                vehicleType: formData.vehicleType,
              }),
        };

    console.log(role, "Form Data Submitted:", payload);
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center rounded-3xl">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-6 space-y-6">
        <div className="flex items-center justify-center mb-6">
          <div className="flex items-center bg-gray-100 rounded-full p-1 w-48">
            <button
              className={`flex-1 flex items-center justify-center py-1 px-2 rounded-l-full transition-all text-center duration-300 ${
                isUser
                  ? "bg-black rounded-full text-white"
                  : "bg-transparent text-gray-700 rounded-full hover:bg-gray-200"
              }`}
              onClick={() => setIsUser(true)}
            >
              User
            </button>
            <button
              className={`flex-1 flex items-center justify-center py-1 px-2 rounded-r-full transition-all duration-300 ${
                !isUser
                  ? "bg-black rounded-full text-white"
                  : "bg-transparent text-gray-700 rounded-full hover:bg-gray-200"
              }`}
              onClick={() => setIsUser(false)}
            >
              Driver
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Common Fields for Login & Register */}
          <div className="space-y-4">
            {!isLogin && (
              <div className="flex space-x-4">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required={!isLogin}
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required={!isLogin}
                />
              </div>
            )}

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Driver-specific Fields */}
          {!isLogin && !isUser && (
            <div className="space-y-4">
              <div className="flex space-x-4">
                <input
                  type="text"
                  name="vehicleColor"
                  placeholder="Vehicle Color"
                  value={formData.vehicleColor}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <input
                  type="text"
                  name="vehicleNoPlate"
                  placeholder="Vehicle No Plate"
                  value={formData.vehicleNoPlate}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="flex space-x-4">
                <input
                  type="number"
                  name="vehicleCapacity"
                  placeholder="Vehicle Capacity"
                  value={formData.vehicleCapacity}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <select
                  name="vehicleType"
                  value={formData.vehicleType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Select Vehicle Type</option>
                  <option value="sedan">Sedan</option>
                  <option value="suv">SUV</option>
                  <option value="van">Van</option>
                </select>
              </div>
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-900 transition-colors"
          >
            {isLogin ? "Login" : "Register"}
          </button>
        </form>

        {/* Error and Success Messages */}
        {error && <p className="text-red-500 text-center">{error}</p>}
        {success && <p className="text-green-500 text-center">{success}</p>}

        {/* Switch between Login and Register */}
        <div className="text-center mt-4">
          <p className="text-sm text-gray-600">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-black hover:underline"
            >
              {isLogin ? "Register" : "Login"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;

import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { UserContext } from "../context/UserContext";

const AuthForm = () => {
  const navigate = useNavigate();
  const { setUser, setToken } = useContext(UserContext);

  const [isUser, setIsUser] = useState(true);
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState({
    fullname: {
      firstname: "",
      lastname: "",
    },
    email: "",
    password: "",
    vehicle: {
      color: "",
      plate: "",
      capacity: "",
      vehicleType: "",
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "firstname" || name === "lastname") {
      setFormData((prev) => ({
        ...prev,
        fullname: {
          ...prev.fullname,
          [name]: value,
        },
      }));
    } else if (
      name === "color" ||
      name === "plate" ||
      name === "capacity" ||
      name === "vehicleType"
    ) {
      setFormData((prev) => ({
        ...prev,
        vehicle: {
          ...prev.vehicle,
          [name]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const endpoint = isLogin ? "login" : "register";
      const userType = isUser ? "user" : "captain";
      const url = `${import.meta.env.VITE_BASE_URL}/${userType}/${endpoint}`;

      let requestBody;
      if (isLogin) {
        requestBody = {
          email: formData.email,
          password: formData.password,
        };
      } else {
        requestBody = {
          fullname: formData.fullname,
          email: formData.email,
          password: formData.password,
        };

        if (!isUser) {
          requestBody.vehicle = formData.vehicle;
        }
      }

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      if (isLogin) {
        setToken(data.token);

        // Clean user data and add role
        const userData = isUser
          ? {
              fullname: data.user.fullname || { firstname: "", lastname: "" },
              email: data.user.email || "",
              role: "user", // Explicitly set role for user
            }
          : {
              fullname: data.captain.fullname || {
                firstname: "",
                lastname: "",
              },
              email: data.captain.email || "",
              role: "captain",
              vehicle: data.captain.vehicle || {
                color: "",
                plate: "",
                capacity: "",
                vehicleType: "",
              },
            };

        setUser(userData); // Save cleaned user or captain data
        console.log("User data saved:", userData);

        setSuccess("Login successful! Redirecting...");
        navigate("/home");
      } else {
        setSuccess("Registration successful! Please login.");
        setIsLogin(true);
        setFormData({
          fullname: {
            firstname: "",
            lastname: "",
          },
          email: "",
          password: "",
          vehicle: {
            color: "",
            plate: "",
            capacity: "",
            vehicleType: "",
          },
        });
      }
    } catch (err) {
      console.error("Error:", err);
      setError(err.message || "An error occurred");
    }
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
                  name="firstname"
                  placeholder="First Name"
                  value={formData.fullname.firstname}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required={!isLogin}
                />
                <input
                  type="text"
                  name="lastname"
                  placeholder="Last Name"
                  value={formData.fullname.lastname}
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
                  name="color"
                  placeholder="Vehicle Color"
                  value={formData.vehicle.color}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <input
                  type="text"
                  name="plate"
                  placeholder="Vehicle No Plate"
                  value={formData.vehicle.plate}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="flex space-x-4">
                <input
                  type="number"
                  name="capacity"
                  placeholder="Vehicle Capacity"
                  value={formData.vehicle.capacity}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <select
                  name="vehicleType"
                  value={formData.vehicle.vehicleType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Vehicle Type</option>
                  <option value="car">Car</option>
                  <option value="motorcycle">Motorcycle</option>
                  <option value="auto">Auto</option>
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

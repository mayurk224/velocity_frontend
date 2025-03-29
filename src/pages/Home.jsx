import React, { useContext } from "react";
import LogoutBtn from "../components/LogoutBtn";
import { UserContext } from "../context/UserContext";

const Home = () => {
  const { user } = useContext(UserContext); // Access user from UserContext

  if (!user) {
    return <div className="p-4">User details not available. Please log in.</div>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">
        Welcome to Home Page ({user.role || "Guest"})
      </h1>
      <div className="mb-4">
        <p className="text-lg">
          <strong>Role:</strong> {user.role}
        </p>
        <p className="text-lg">
          <strong>Full Name:</strong>{" "}
          {user.fullname?.firstname
            ? `${user.fullname.firstname} ${user.fullname.lastname}`
            : "N/A"}
        </p>
        <p className="text-lg">
          <strong>Email:</strong> {user.email || "N/A"}
        </p>
        {user.role === "captain" && user.vehicle && (
          <div className="mt-2">
            <h2 className="text-xl font-semibold">Vehicle Details:</h2>
            <p className="text-lg">
              <strong>Color:</strong> {user.vehicle.color || "N/A"}
            </p>
            <p className="text-lg">
              <strong>Plate:</strong> {user.vehicle.plate || "N/A"}
            </p>
            <p className="text-lg">
              <strong>Capacity:</strong> {user.vehicle.capacity || "N/A"}
            </p>
            <p className="text-lg">
              <strong>Type:</strong> {user.vehicle.vehicleType || "N/A"}
            </p>
          </div>
        )}
      </div>
      <LogoutBtn />
    </div>
  );
};

export default Home;

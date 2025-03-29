import React from "react";
import { Routes, Route } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import Home from "./pages/Home";
import UserProtectWrapper from "./pages/UserProtectWrapper";
import LogoutBtn from "./components/LogoutBtn";
import UserProvider from "./context/UserContext";

const App = () => {
  return (
    <UserProvider>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route
          path="/home"
          element={
            <UserProtectWrapper>
              <Home />
            </UserProtectWrapper>
          }
        />
        <Route
          path="/logout"
          element={
            <UserProtectWrapper>
              <LogoutBtn />
            </UserProtectWrapper>
          }
        />
      </Routes>
    </UserProvider>
  );
};

export default App;

import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import AdministratorUserPage from "./pages/AdministratorUserPage";
import AdministratorOSCPage from "./pages/AdministratorOSCPage";
import Layout from "./components/Layout";
import RequireAuth from "./components/RequireAuth";
import Error404 from "./pages/Error404";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  //const [user, setUser] = useState(null);
  const [user, setUser] = useState({
    fullName: "John Doe",
    role: "ADMINISTRATOR",
    registration: "mock-registration-data",
  });

  const handleClick = (handleUser) => {
    setUser(handleUser);
  };

  console.log("user", user);

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<LoginPage handleClick={handleClick} />} />
        <Route
          path="/login"
          element={<LoginPage handleClick={handleClick} />}
        />
        <Route
          element={
            <ProtectedRoute
              isAllowed={!!user && user.role == "ADMINISTRATOR"}
              redirectTo="/login"
            />
          }
        >
          <Route
            path="/dashboard"
            element={<Dashboard />}
          />
          <Route
            path="/dashboard/users"
            element={<AdministratorUserPage />}
          />
          <Route
            path="/dashboard/oscs"
            element={<AdministratorOSCPage />}
          />
        </Route>
        <Route path="*" element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

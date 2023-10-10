import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import LoginPage from "./pages/LoginPage";
import AdministratorSurveysPage from "./pages/AdministratorSurveyPage";
import AdministratorQuestionsPage from "./pages/AdministratorQuestionPage";
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
            path="/administrator/surveys"
            element={<AdministratorSurveysPage />}
          />
          <Route
            path="/administrator/questions"
            element={<AdministratorQuestionsPage />}
          />
        </Route>
        <Route path="*" element={<Error404 />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

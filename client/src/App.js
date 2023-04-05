import React from "react";
import { useSelector } from "react-redux";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";

// react bootstrap configuration
import "../node_modules/react-bootstrap/dist/react-bootstrap.min";
import "bootstrap/dist/css/bootstrap.css";

import NavigationBar from "./components/UI/NavigationBar";
import Expenses from "./pages/Expenses";
import Auth from "./pages/Auth";

function App() {
  const navigate = useNavigate();

  const isLoggedIn = useSelector((x) => x.auth.isLoggedIn);
  const user = useSelector((x) => x.auth);
  console.log(user);
  return (
    <React.Fragment>
      <NavigationBar />

      <Routes>
        {!isLoggedIn && <Route path="/login" element={<Auth />} />}

        <Route path="/expenses" element={<Expenses />} />
        {!isLoggedIn && <Route path="/" element={<Navigate to="/login" />} />}
        {isLoggedIn && <Route path="/" element={<Navigate to="/expenses" />} />}
      </Routes>
    </React.Fragment>
  );
}

export default App;

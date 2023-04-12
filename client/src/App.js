import React from "react";
import { useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";

// react bootstrap configuration
import "../node_modules/react-bootstrap/dist/react-bootstrap.min";
import "bootstrap/dist/css/bootstrap.css";

import NavigationBar from "./components/UI/NavigationBar";
import Expenses from "./pages/Expenses";
import Auth from "./pages/Auth";
import { Container } from "react-bootstrap";
import Leaderboard from "./components/Premium/Leaderboard";
import ExpenseReport from "./components/Premium/ExpenseReport";

function App() {
  const isLoggedIn = useSelector((x) => x.auth.isLoggedIn);
  const isPremium = useSelector((x) => x.auth.isPremium);

  return (
    <Container>
      <NavigationBar />

      <Routes>
        {!isLoggedIn && <Route path="/login" element={<Auth />} />}

        <Route path="/expenses" element={<Expenses />} />
        {!isLoggedIn && <Route path="/" element={<Navigate to="/login" />} />}
        {isLoggedIn && <Route path="/" element={<Navigate to="/expenses" />} />}
        {isPremium && <Route path="/leaderboard" element={<Leaderboard />} />}
        {isPremium && (
          <Route path="/expense-report" element={<ExpenseReport />} />
        )}
      </Routes>
    </Container>
  );
}

export default App;

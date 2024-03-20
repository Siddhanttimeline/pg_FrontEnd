import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./Component/Login";
import Home from "./Component/Home";
import SignUp from "./Component/SignUp";
import Records from "./Component/Records";
import StudentForm from "./Component/StudentForm";
import PaymentHistoryDashboard from "./Component/PaymentHistoryDashboard";
import Profile from "./Component/Profile";
import Pay from "./Component/Pay";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "./store/index";

function App({ children }) {
  console.log("::::::::::::::::::::::::  APP :::::::::::::::::::::::::::::");
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isAuthenticated);
  console.log(isLoggedIn);

  useEffect(() => {
    const checkSession = () => {
      const isLoggedInValue = sessionStorage.getItem("isLoggedIn") === "true";
      if (!isLoggedInValue) {
        dispatch(authActions.logout());
      }
    };

    const interval = setInterval(checkSession, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            isLoggedIn ? <Navigate to="/dashboard" /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/dashboard"
          element={isLoggedIn ? <Home /> : <Navigate to="/login" />}
        />
        <Route
          path="/signup"
          element={isLoggedIn ? <SignUp /> : <Navigate to="/login" />}
        />
        <Route
          path="/records"
          element={isLoggedIn ? <Records /> : <Navigate to="/login" />}
        />
        <Route
          path="/add-student"
          element={isLoggedIn ? <StudentForm /> : <Navigate to="/login" />}
        />
        <Route
          path="/profile"
          element={isLoggedIn ? <Profile /> : <Navigate to="/login" />}
        />
        <Route
          path="/payment-history"
          element={
            isLoggedIn ? <PaymentHistoryDashboard /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/pay"
          element={isLoggedIn ? <Pay /> : <Navigate to="/login" />}
        />
      </Routes>
    </Router>
  );
}

export default App;

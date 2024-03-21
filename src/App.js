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

function App({ children }) {
  console.log("::::::::::::::::::::::::  APP :::::::::::::::::::::::::::::");
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/dashboard" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/records" element={<Records />} />
        <Route path="/add-student" element={<StudentForm />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/payment-history" element={<PaymentHistoryDashboard />} />
        <Route path="/pay" element={<Pay />} />
      </Routes>
    </Router>
  );
}

export default App;

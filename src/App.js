import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./Component/Login";
import Home from "./Component/Home";
import SignUp from "./Component/SignUp"; // Import your SignUp component
import Records from "./Component/Records";
import StudentForm from "./Component/StudentForm";
import PaymentHistoryDashboard from "./Component/PaymentHistoryDashboard";
import Profile from "./Component/Profile";

function App({ children }) {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/records" element={<Records />} />
        <Route path="/add-student" element={<StudentForm />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/payment-history" element={<PaymentHistoryDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;

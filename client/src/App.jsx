import { Routes, Route, Navigate } from "react-router-dom";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Features from "./pages/Features";
import About from "./pages/About";
import Contact from "./pages/Contact";

import AdminDashboard from "./pages/AdminDashboard";
import VerifierDashboard from "./pages/VerifierDashboard";
import UserDashboard from "./pages/UserDashboard";

function App() {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  if (!token) {
    return (
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/features" element={<Features />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    );
  }

  // ================= ADMIN =================

  if (user.role === "admin") {
    return (
      <Routes>
        <Route path="/dashboard" element={<AdminDashboard view="dashboard" />} />
        <Route path="/users" element={<AdminDashboard view="users" />} />
        <Route path="/evidence" element={<AdminDashboard view="evidence" />} />
        <Route path="/verification" element={<AdminDashboard view="verification" />} />
        <Route path="/activity-logs" element={<AdminDashboard view="activity" />} />
        <Route path="/analytics" element={<AdminDashboard view="analytics" />} />
        <Route path="/reports" element={<AdminDashboard view="reports" />} />
        <Route path="/notifications" element={<AdminDashboard view="notifications" />} />
        <Route path="/profile" element={<AdminDashboard view="profile" />} />
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    );
  }

  // ================= VERIFIER =================

  if (user.role === "verifier") {
    return (
      <Routes>
        <Route path="/dashboard" element={<VerifierDashboard view="dashboard" />} />
        <Route path="/evidence" element={<VerifierDashboard view="evidence" />} />
        <Route path="/verification" element={<VerifierDashboard view="verification" />} />
        <Route path="/activity-logs" element={<VerifierDashboard view="activity" />} />
        <Route path="/analytics" element={<VerifierDashboard view="analytics" />} />
        <Route path="/reports" element={<VerifierDashboard view="reports" />} />
        <Route path="/notifications" element={<VerifierDashboard view="notifications" />} />
        <Route path="/profile" element={<VerifierDashboard view="profile" />} />
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    );
  }

  // ================= USER =================

  return (
    <Routes>
      <Route path="/dashboard" element={<UserDashboard view="dashboard" />} />
      <Route path="/evidence" element={<UserDashboard view="evidence" />} />
      <Route path="/activity-logs" element={<UserDashboard view="activity" />} />
      <Route path="/reports" element={<UserDashboard view="reports" />} />
      <Route path="/notifications" element={<UserDashboard view="notifications" />} />
      <Route path="/profile" element={<UserDashboard view="profile" />} />
      <Route path="*" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
}

export default App;
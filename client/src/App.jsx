import React from "react";
import './App.css';

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Navbar from "./components/common/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import AssignRoles from "./pages/AssignRoles";
import AddMed from "./pages/AddMed";
import Supply from "./pages/Supply";
import Track from "./pages/Track";

function ProtectedRoute({ children, ownerOnly }) {
  const { user } = useAuth() || {};
  if (!user) return <Navigate to="/login" replace />;
  if (ownerOnly && user.role !== "owner") return <Navigate to="/" replace />;
  return children;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/assignroles" element={
            <ProtectedRoute ownerOnly>
              <AssignRoles />
            </ProtectedRoute>
          } />
          <Route path="/addproduct" element={
            <ProtectedRoute ownerOnly>
              <AddMed />
            </ProtectedRoute>
          } />
          <Route path="/supply" element={
            <ProtectedRoute>
              <Supply />
            </ProtectedRoute>
          } />
          <Route path="/track" element={
            <ProtectedRoute>
              <Track />
            </ProtectedRoute>
          } />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
export default App;

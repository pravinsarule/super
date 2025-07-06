
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import { Login } from './Pages/Login/Login';
import { Dashboard } from './Pages/Dashboard/Dashboard';
import { Home } from './Pages/Home/Home';
import { User } from './Pages/Dashboard/User';
import { Vendor } from './Pages/Dashboard/Vendor';
import {Header} from './Pages/Dashboard/Header';

const LoginMiddleware = () => {
  const isAuthenticated = !!localStorage.getItem('token');
  return isAuthenticated ? <Navigate to="/Dashboard" /> : <Login />;
};

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('token');
  if (!isAuthenticated) {
    alert("Session expired. Please login again.");
    return <Navigate to="/Login" />;
  }
  return children;
};

export const App = () => {
  return (
    <div>
      <BrowserRouter>
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Login" element={<LoginMiddleware />} />
          <Route path="/Dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/User" element={<ProtectedRoute><User /></ProtectedRoute>} />
          <Route path="/Vendor" element={<ProtectedRoute><Vendor /></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

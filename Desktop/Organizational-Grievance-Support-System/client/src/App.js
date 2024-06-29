import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from './Home';
import Login from './Login';
import Signup from './Signup';
import Dashboard from './Dashboard';
import GrievanceForm from './GrievanceForm';
import Profile from './Profile';
import ProtectedRoute from './ProtectedRoute';
import UserContextProvider from './context/userContextProvider';
import UserContext from './context/userContext';
import AdminDash from './AdminDash';

export default function App() {
  return (
    <BrowserRouter>
      <UserContextProvider>
        <AppContent />
      </UserContextProvider>
    </BrowserRouter>
  );
}

function AppContent() {
  const { user } = useContext(UserContext);

  // Check if user is authenticated (you may have your own authentication logic)
  const isAuthenticated = !!user;

  // Determine user role
  const userRole = user ? user.role : null;

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/raise-grievance" element={<GrievanceForm />} />
        <Route path="/me" element={<Profile />} />
        
        {/* ProtectedRoute example */}
        <Route path="/Dashboard" element={
          isAuthenticated ? (
            <ProtectedRoute>
              {userRole === 'admin' ? <AdminDash /> : <Dashboard />}
            </ProtectedRoute>
          ) : (
            <Navigate to="/login" replace />
          )
        } />

        {/* Default route if none of the above match */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

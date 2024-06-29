import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from './Home';
import Login from './Login';
import Signup from './Signup';
import { ToastContainer, toast } from 'react-toastify';

import "react-toastify/dist/ReactToastify.css";
import Dashboard from './Dashboard';
import GrievanceForm from "./GrievanceForm"
import Profile from "./Profile"
import ProtectedRoute from './ProtectedRoute';
import UserContextProvider from "./context/userContextProvider"


export default function App(){
  return (
    <BrowserRouter>
    <UserContextProvider>
      <Routes>
        <Route path="/" exact element={<Home/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path='/Dashboard' element= {<ProtectedRoute><Dashboard/></ProtectedRoute>} />
        <Route path='/raise-grievance' element={<GrievanceForm/>} />
        <Route path='/me' element={<Profile/>} />


      </Routes>
      </UserContextProvider>
    </BrowserRouter>
  );
};
;

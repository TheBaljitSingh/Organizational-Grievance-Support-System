// src/components/Dashboard.js

import { useEffect, useState, useContext } from "react";
import React from 'react';

import { Link } from 'react-router-dom';
import UserContext from "./context/userContext";



const Dashboard = () => {

  const {user} = useContext(UserContext)
  
  // const user = {
  //   name: "user_name",
  //   email:"email"
  // }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-5">
      <div className="bg-white p-10 shadow-lg rounded-lg max-w-4xl w-full">
        <h2 className="text-3xl font-bold mb-10 text-center">Dashboard</h2>
        <div className="mb-6 text-center">
          <h3 className="text-xl font-semibold">Welcome, {user.name}</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link to="/me" className="bg-blue-500 text-white px-4 py-6 rounded-md text-center hover:bg-blue-600">
            <h3 className="text-xl font-semibold">View Profile</h3>
            <p className="mt-2">Check and update your profile information.</p>
          </Link>
          <Link to="/raise-grievance" className="bg-green-500 text-white px-4 py-6 rounded-md text-center hover:bg-green-600">
            <h3 className="text-xl font-semibold">Raise Grievance</h3>
            <p className="mt-2">Submit a new grievance and track its status.</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

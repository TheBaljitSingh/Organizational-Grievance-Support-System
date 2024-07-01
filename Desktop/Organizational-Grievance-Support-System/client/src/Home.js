// Home.js

import { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import Cookies from "js-cookie";

const Home = () => {


    const navigate = useNavigate();
    const token = Cookies.get('token');


  useEffect(()=>{
    if(token){
      navigate("/Dashboard");
    }
  },[navigate])



  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 shadow-lg rounded-lg max-w-md w-full text-center">
        <h2 className="text-2xl font-bold mb-8">Welcome to Our Grievance System</h2>
        <div className="flex flex-col space-y-4">
          <Link
            to="/login"
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;

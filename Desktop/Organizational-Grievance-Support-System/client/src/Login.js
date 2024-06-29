import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Cookies from "js-cookie";
import UserContext from './context/userContext';


const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const {setUser} = useContext(UserContext)

  const handleSubmit = (e) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }

    setEmail("");
    setPassword("");
    console.log("submit called");
    // console.log(email + password);
    //  API call logic here
    axios.post(`${process.env.REACT_APP_BACKEND_URL}api/login`, {email, password})
    .then(res=>{
      console.log(res);
      if(res.status===200){
        console.log(res.data);
        setUser(res.data.user);

        Cookies.set('token', res.data.token,{expires: 3})

        toast.success('Login successful! Redirecting to dashboard...', {
          position: "bottom-center",
          onClose: () => navigate('/dashboard')
        });
      }else{
        toast.error('Invalid Credentials',{
          position: "bottom-center",
      })
      }
    })
    .catch(error=>{
            console.log("login failed ", error.message);
            toast.error(`${error.message}`,{
                position: "bottom-center"
            });
    })


  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12">
      <div className="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
        <div className="bg-white shadow w-full rounded-lg divide-y divide-gray-200">
          <form onSubmit={handleSubmit}>
            <div className="px-5 py-7">
              <h1 className="font-bold text-center text-2xl mb-10">Login to Your Account</h1>
              <label className="font-semibold text-sm text-gray-600 pb-1 block">E-mail</label>
              <input
                required
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="email"
                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
              />
              <label className="font-semibold text-sm text-gray-600 pb-1 block">Password</label>
              <input required
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
              />
              <button
                onClick={handleSubmit}
                type="button"
                className="transition duration-200 bg-blue-500 hover:bg-blue-600 focus:bg-blue-700 focus:shadow-sm focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 text-white w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-semibold text-center inline-block"
              >
                <span className="inline-block mr-2">Login</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 inline-block">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>
          </form>

          <div className="p-5">
            <div className="grid grid-cols-1 gap-1">
              <button
                type="button"
                className="transition duration-200 border border-gray-200 text-gray-500 w-full py-2.5 rounded-lg text-sm shadow-sm hover:shadow-md font-normal text-center inline-block"
              >
                Google
              </button>
            </div>
          </div>
          <div className="py-5">
            <div className="grid grid-cols-1 gap-1">
              <div className="text-center sm:text-left whitespace-nowrap">
                <Link to="/">
                  <button className="transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-200 focus:outline-none focus:bg-gray-300 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 inline-block align-text-top">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    <span className="inline-block ml-1">Back to home</span>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;

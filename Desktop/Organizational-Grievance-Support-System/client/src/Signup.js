import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] =useState("");
  const [file, setFile] = useState();
  const [previewAvatar, setPreviewAvatar] = useState();

  const handleFileChange = (e)=>{
    setFile(e.target.files[0]);
    setPreviewAvatar(URL.createObjectURL(e.target.files[0]) || null);
  
   }
   

  const handleSubmit = (e) => {
    // console.log(name,email,password);

     if (e && e.preventDefault) {
      e.preventDefault();
    }
    const formData = new FormData();
    formData.append("name",name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append('avatar', file);
    const config = {
      headers:{
        'content-type': 'multipart/form-data',
      }
    }

    axios.post(`${process.env.REACT_APP_BACKEND_URL}api/register`, formData, config)
      .then((res) => {
        if (res.status === 201) {
          toast.success('Register successful!', {
            position: 'bottom-center',
            onClose: () => navigate('/login'),
          });
        }
      })
      .catch((error) => {
        toast.error(`${error.message}`, {
          position: 'bottom-center',
        });
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 shadow-lg rounded-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-8 text-center">Sign Up</h2>
        <form onSubmit={handleSubmit} action="/upload" enctype="multipart/form-data"  className="space-y-4 ">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              onChange={(e)=>setName(e.target.value)}
              value={name}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>
          <div className="">
            <div className=" ">
              <label htmlFor="avatar" className="block text-sm font-medium text-gray-700">
                Avatar
              </label>
              <input
                type="file"
                name="avatar"
                id="avatar"
                onChange={handleFileChange}
                className="mt-1 w-full block px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                accept="image/*"
              />
            </div>
            <div className="flex flex-col items-center  p-4 rounded-md">
              <p className="mb-2">Preview Avatar</p>
              <img src={previewAvatar} className=" w-24 h-24 rounded-md mx-auto mb-4 flex items-center"/>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          >
            Sign Up
          </button>
        </form>
        <div className="mt-8 text-center">
          <Link to="/" className="transition duration-200 mx-5 px-5 py-4 cursor-pointer font-normal text-sm rounded-lg text-gray-500 hover:bg-gray-200 focus:outline-none focus:bg-gray-300 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ring-inset">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4 inline-block align-text-top">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className="inline-block ml-1">Back to home</span>
          </Link>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Signup;

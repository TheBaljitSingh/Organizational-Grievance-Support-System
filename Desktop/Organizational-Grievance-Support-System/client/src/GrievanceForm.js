// src/components/GrievanceForm.js

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from "axios"
import { ToastContainer, toast } from 'react-toastify';


import Cookies from "js-cookie"


const GrievanceForm = () => {


  // console.log(Cookies.get('token'));

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'Salary',
    department: '',
    severity: 'Low',
    attachments: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      attachments: e.target.files[0],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    for (let key in formData) {
      data.append(key, formData[key]);
    }

    const token = Cookies.get('token');

    axios.post(`${process.env.REACT_APP_BACKEND_URL}api/creategrievance`,formData,{
      headers:{
        'Authorization': `Bearer ${token}`
      }
    })
    .then(res=>{
      console.log(res.status);
      if(res.status===201){
        toast.success('Grievance Submitted!..', {
          position: "bottom-center",
        });
      }

    })
    .catch(error=>{
      toast.error('Newtork Error!..', {
        position: "bottom-center",
      });
    })

    console.log('Grievance submitted:', formData);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-5">
      <div className="bg-white p-10 shadow-lg rounded-lg max-w-2xl w-full">
        <h2 className="text-3xl font-bold mb-6 text-center">Raise a Grievance</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              name="title"
              id="title"
              value={formData.title}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              id="description"
              value={formData.description}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              rows="4"
              required
            ></textarea>
          </div>
          <div>
            <label htmlFor="type" className="block text-sm font-medium text-gray-700">
              Type
            </label>
            <select
              name="type"
              id="type"
              value={formData.type}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            >
              <option value="Salary">Salary</option>
              <option value="Work Environment">Work Environment</option>
              <option value="Harassment">Harassment</option>
              <option value="Others">Others</option>
            </select>
          </div>
          <div>
            <label htmlFor="department" className="block text-sm font-medium text-gray-700">
              Department
            </label>
            <input
              type="text"
              name="department"
              id="department"
              value={formData.department}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label htmlFor="severity" className="block text-sm font-medium text-gray-700">
              Severity
            </label>
            <select
              name="severity"
              id="severity"
              value={formData.severity}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>
          <div>
            <label htmlFor="attachments" className="block text-sm font-medium text-gray-700">
              Attachments
            </label>
            <input
              type="file"
              name="attachments"
              id="attachments"
              onChange={handleFileChange}
              className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
          >
            Submit
          </button>
        </form>
        <div className="mt-6 text-center">
          <Link to="/dashboard" className="text-blue-500 hover:underline">
            Back to Dashboard
          </Link>
        </div>
      </div>
      <ToastContainer />

    </div>
  );
};

export default GrievanceForm;

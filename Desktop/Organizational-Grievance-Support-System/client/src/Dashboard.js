import { useEffect, useState, useContext } from "react";
import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import UserContext from "./context/userContext";
import Cookies from "js-cookie";

const Dashboard = () => {
  const { user } = useContext(UserContext);
  const [grievances, setGrievances] = useState([]);

  useEffect(() => {
    const fetchGrievances = async () => {
      try {
        const token = Cookies.get('token'); 
        console.log(token);

        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}api/grievances`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setGrievances(response.data.grievances);
      } catch (error) {
        console.error("Error fetching grievances:", error.message);
      }
    };

    fetchGrievances();
  }, []);

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
        <div className="mt-10">
          <h3 className="text-2xl font-semibold mb-4">Your Grievances</h3>
          {grievances.length === 0 ? (
            <p className="text-center text-gray-500">No grievances found.</p>
          ) : (
            <table className="min-w-full bg-white">
              <thead>
                <tr>
                  <th className="py-2">Title</th>
                  <th className="py-2">Type</th>
                  <th className="py-2">Department</th>
                  <th className="py-2">Severity</th>
                  <th className="py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {grievances.map(grievance => (
                  <tr key={grievance._id}>
                    <td className="py-2 text-center">{grievance.title}</td>
                    <td className="py-2 text-center">{grievance.type}</td>
                    <td className="py-2 text-center">{grievance.department}</td>
                    <td className="py-2 text-center">{grievance.severity}</td>
                    <td className="py-2 text-center">{grievance.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

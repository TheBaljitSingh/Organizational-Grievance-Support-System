import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';

export default function AdminDash() {
  const [grievances, setGrievances] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGrievances = async () => {
      try {
        const token = Cookies.get('token');
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}api/grievances/admin`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(response.data);
        setGrievances(response.data.grievance); // Ensure grievances is initialized with an empty array if response.data.grievances is undefined
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGrievances();
  }, []);

  if (loading) return <div>Loading...</div>;

  if (error) return <div>Error: {error}</div>;

  return (
    <div className="app-container">
      <header className="header bg-indigo-700 text-white py-4">
        <div className="header-content max-w-screen-xl mx-auto flex justify-between items-center">
          <div className="logo text-2xl font-bold">Admin Dashboard</div>
          <nav>
            <ul className="flex">
              <li className="ml-4">
                <Link to="/admin/grievances" className="text-white hover:text-gray-300">
                  All Grievances
                </Link>
              </li>
              {/* Add more navigation links as needed */}
            </ul>
          </nav>
        </div>
      </header>

      <main className="content flex-grow bg-gray-100 max-w-screen-xl mx-auto py-8">
        <div className="max-w-screen-lg mx-auto">
          <h3 className="text-2xl font-semibold mb-4">Your Grievances</h3>
          {grievances && (
            <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-md overflow-hidden">
              <thead className="bg-indigo-700 text-white">
                <tr>
                  <th className="py-2 px-4">Title</th>
                  <th className="py-2 px-4">Type</th>
                  <th className="py-2 px-4">Department</th>
                  <th className="py-2 px-4">Severity</th>
                  <th className="py-2 px-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {grievances.map((grievance) => (
                  <tr key={grievance._id} className="border-t border-gray-200">
                    <td className="py-2 px-4">{grievance.title}</td>
                    <td className="py-2 px-4">{grievance.type}</td>
                    <td className="py-2 px-4">{grievance.department}</td>
                    <td className="py-2 px-4">{grievance.severity}</td>
                    <td className="py-2 px-4">{grievance.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>

      <footer className="footer bg-indigo-700 text-white py-4 text-center">
        <div className="footer-content max-w-screen-xl mx-auto">
          &copy; 2024 Admin Dashboard. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

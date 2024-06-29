import React, {useContext} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserContext from './context/userContext';
import axios from 'axios';
import Cookies from "js-cookie";
import { ToastContainer,toast } from "react-toastify";




const Profile = () => {

  const navigate = useNavigate();
  // Dummy user data
  const {user} = useContext(UserContext);

  const handleLogout = ()=>{
    const token = Cookies.get('token');
    console.log("handleLogout called");

    axios.post(`${process.env.REACT_APP_BACKEND_URL}api/logout`, {token})
    .then(res=>{

      if(res.status===200){
        Cookies.remove('token');

        toast.success('Successfully Logout! Redirect to Home...', {
          position: "bottom-center",
          onClose: () => navigate('/')
        });
      }else{
        toast.error('something wrong!', {
          position: "bottom-center",
        });

      }
    })
    .catch(error=>{
      console.log(error);
        toast.error("error while logout",{
          position: "bottom-center",
        })
    })

  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-5">
      <div className="bg-white p-8 shadow-lg rounded-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Profile</h2>
        <div className="text-center mb-6">
          <img src={user.avatar} alt="Avatar" className="w-24 h-24 rounded-full mx-auto mb-4" />
          <h3 className="text-xl font-semibold">{user.name}</h3>
          <p className="text-gray-600">{user.email}</p>
        </div>
        <Link to="/dashboard" className="w-full bg-blue-500 text-white px-4 py-2 rounded-md text-center block hover:bg-blue-600">
          Back to Dashboard
        </Link>
        <Link to="/logout" onClick={handleLogout} className="w-full bg-red-300 mt-2 text-white px-4 py-2 rounded-md text-center block hover:bg-red-400">Logout</Link>
        
      </div>
      <ToastContainer/>

    </div>
  );
};

export default Profile;
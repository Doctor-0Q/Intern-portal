import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from 'react-hot-toast'
import API_URL from '../config';

export const AdminPage = () => {
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("")


  const handleEmail=(event)=>{
    setEmail(event.target.value)
  }
  const handlePassword=(event)=>{
    setPassword(event.target.value)
  }

  const navigate = useNavigate();
  const submitHandler = async(event) => {
    event.preventDefault();
    try {
      const response=await axios.post(`${API_URL}/adminLogin`,{
        email:email,
        password:password
      })
      if(response.data.success){
        toast.success(response.data.message)
        localStorage.setItem('isAdmin', 'true');
        navigate('./Update-Intern-details');
      }
      else{
        toast.error("There was some problem, try again..")
      }
      
    } catch (error) {
      toast.error(error.response.data.message)
    }
  };

  return (
    <> <form action="">
      <div className="flex flex-col justify-center items-center md:w-full md:h-[650px] h-[400px] bg-white rounded-lg">
        <div className="flex flex-col md:mb-4">
          <h4 className="md:mb-2">Email</h4>
          <input
          onChange={handleEmail}
          value={email}
            id="input-field"
            type="email"
            placeholder="enter your email"
            className="w-[300px] h-[40px] border-b-2 border-gray-400 text-base placeholder-gray-500 focus:border-blue-500 focus:outline-none pl-1"
          />
        </div>
        <div className="flex flex-col mb-4">
          <h4 className="md:mb-2">Password</h4>
          <input
          onChange={handlePassword}
          value={password}
            id="input-field"
            type="password"
            placeholder="enter your password"
            className="w-[300px] h-[40px] border-b-2 border-gray-400 text-base placeholder-gray-500 focus:border-blue-500 focus:outline-none pl-1"
          />
        </div>
        <div className="text-gray-600 mb-5">
          <Link to="/" className="text-inherit no-underline">
            forget your password?
          </Link>
        </div>
        <div>
          <button
            onClick={submitHandler}
            className="w-[327px] h-[66px] rounded-lg bg-green-600 text-white font-medium text-lg transition-transform duration-300 ease-in-out hover:bg-green-700 hover:scale-105"
          >
            Login
          </button>
        </div>
      </div>
      </form>
    </>
  );
};

export default AdminPage;

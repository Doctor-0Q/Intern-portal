import React, { useState } from "react";
import HomeImgLeft from "../Assets/HomeImgLeft.svg";
import HomeImgRight from "../Assets/HomeImgRight.svg";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import toast from 'react-hot-toast'

export const HomePage = () => {
  const [inputValue, setInputValue] = useState("");

  const navigate =useNavigate();

  const submitHandler=async(e)=>{
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/findIntern`,{
        id: inputValue
      });
      if(response.data.success){

        navigate('./intern-details', { state: { intern: response.data.internDetails } })
      }
    } catch (error) {
      toast.error(error.response.data.message)
    }
  }

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center w-full bg-transparent md:-mb-[113px] md:h-[777px] h-[450px]">
        <div className="mt-14 flex flex-col justify-center items-center h-[250px] z-10">
          <div className="flex flex-row justify-center mb-5 md:w-full w-[80%] md:text-xl">
            <p className="font-semibold font-source-sans">
              <span className="text-red-600 font-semibold mr-2 font-source-sans leading-[30.17px]">
                Attention all users
              </span>
              : Your unique Intern IDs are ready for pickup! Check your mail
              inbox now to find yours!
            </p>
          </div>
          <form onSubmit={()=>{submitHandler(event)}} className="flex flex-col items-center justify-center">
          <div className="mb-5">
            <input
              id="input-field"
              type="text"
              value={inputValue}
              onChange={handleChange}
              placeholder="Enter your unique ID"
              className="w-[300px] md:w-[547px] md:h-[64px] h-[50px] rounded-lg border-none pl-5 text-lg font-semibold font-source-sans transition-all duration-300 ease-in-out"
            />
            <p className="mt-2">{inputValue}</p>
          </div>
          
          
          <div className="w-60 h-16 text-2xl rounded-3xl bg-[#063360] text-white font-medium transition-all duration-300 ease-in-out hover:bg-[#041e36] cursor-pointer flex justify-center">
            <button className="p-2">Submit</button>
          </div>
          </form>
        </div>
        <div className="flex flex-row w-full relative items-baseline z-0 inset-0">
          <div className="w-3/4 hidden lg:block">
            <img
              src={HomeImgLeft}
              alt=""
              width={1000}
              className="opacity-70 scale-90 -translate-x-32 -translate-y-5"
            />
          </div>
          <div className="w-1/4 hidden lg:block">
            <img
              src={HomeImgRight}
              alt=""
              width={543}
              height={534}
              className="absolute bottom-24 -right-4 scale-95"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;

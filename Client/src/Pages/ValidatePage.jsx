import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import HomeImgLeft from "../Assets/HomeImgLeft.svg";
import axios from "axios";
import toast from "react-hot-toast";
import API_URL from '../config';

export const ValidatePage = () => {
  const [valid, setValid] = useState(true);
  const [certificateID, setCertificateID] = useState("");

  const handleChange = (event) => {
    setCertificateID(event.target.value);
  };
  const navigate = useNavigate();

  const submitHandler = async (event) => {
    event.preventDefault();
    if (!certificateID) {
      toast.error("Please enter certificate ID");
    } else {
      try {
        const response = await axios.post(`${API_URL}/validate`, {
          id: certificateID,
        });
        if (response.data.success) {
          setValid(true);
          navigate("./Validated");
        } else {
          setValid(false);
        }
      } catch (error) {
        setValid(false)
      }
    }
  };

  const handleHelpClick = () => {
    window.location.href = "mailto:docq.help@gmail.com";
  };

  return (
    <>
      <div className={`flex flex-col justify-center items-center w-screen ${
            valid ? "md:h-[650px]" : "md:h-[750px]"
          }  h-[450px] bg-transparent md:mt-[5%]`}>
        <div className="flex items-center justify-center mb-5 flex-row md:w-full w-[80%] font-semibold md:text-xl">
          <p className="font-semibold font-source-sans">
            <span className="text-red-600 font-semibold mr-2 font-source-sans leading-[30.17px]">
              Attention all users
            </span>
            : Check your Certificate ID that is mentioned on your Certificate!
          </p>
        </div>
        <form onSubmit={submitHandler} className="flex items-center flex-col">
          <div className="mb-5">
            <input
              id="input-field"
              type="text"
              value={certificateID}
              onChange={handleChange}
              placeholder="Enter your Certificate ID"
              className="w-[300px] md:w-[547px] md:h-[64px] h-[50px] rounded-lg border-none pl-5 text-lg font-semibold transition-all duration-300 ease-in-out"
            />
            <p className="mt-2">{certificateID}</p>
          </div>
          <div>
            <button className="md:w-[327px] md:h-[66px] w-[200px] h-[50px] rounded-[20px] bg-[#063360] text-white font-medium text-2xl transition-all duration-300 ease-in-out hover:bg-[#041e36] cursor-pointer">
              Submit
            </button>
          </div>
        </form>
        <div
          className={`flex items-center justify-center mt-10 ${
            valid ? "hidden" : ""
          }`}
        >
          <img
            src="src/Assets/cross.png"
            alt=""
            className="h-[80px] w-20 mr-[20px]"
          />
          <h1 className="font-bold text-2xl md:text-4xl text-white">
            This certificate is not valid..
          </h1>
        </div>
        <div className={`flex justify-center ${
            valid ? "hidden" : ""
          }`}>
          <button
            onClick={handleHelpClick}
            className="px-8 py-3 bg-yellow-400 text-xl md:text-2xl font-bold text-gray-800 rounded-full shadow-lg transition-transform transform hover:scale-105 focus:scale-105 focus:outline-none"
          >
            Need help?
          </button>
        </div>
        <div className="relative w-screen justify-center items-center">
          <div className="w-full md:ml-[15%]">
            <img
              src={HomeImgLeft}
              alt=""
              width="1000px"
              className="opacity-60 scale-100 md:block hidden"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default ValidatePage;

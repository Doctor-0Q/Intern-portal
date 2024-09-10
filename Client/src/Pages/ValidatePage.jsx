import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import HomeImgLeft from "../Assets/HomeImgLeft.svg";

export const ValidatePage = () => {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (event) => {
    setInputValue(event.target.value);
  };
  const navigate = useNavigate();

  const submitHandler = async () => {
    navigate("./Validated");
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center w-screen md:h-[650px] h-[450px] bg-transparent md:mt-[3%]">
        <div className="flex items-center justify-center mb-5 flex-row md:w-full w-[80%] font-semibold md:text-xl">
          <p className="font-semibold font-source-sans">
            <span className="text-red-600 font-semibold mr-2 font-source-sans leading-[30.17px]">
              Attention all users
            </span>
            : Check your Certificate ID that is mentioned on your Certificate!
          </p>
        </div>
        <div className="mb-5">
          <input
            id="input-field"
            type="text"
            value={inputValue}
            onChange={handleChange}
            placeholder="Enter your Certificate ID"
            className="w-[300px] md:w-[547px] md:h-[64px] h-[50px] rounded-lg border-none pl-5 text-lg font-semibold transition-all duration-300 ease-in-out"
          />
          <p className="mt-2">{inputValue}</p>
        </div>
        <div>
          <button
            onClick={submitHandler}
            className="md:w-[327px] md:h-[66px] w-[200px] h-[50px] rounded-[20px] bg-[#063360] text-white font-medium text-2xl transition-all duration-300 ease-in-out hover:bg-[#041e36] cursor-pointer"
          >
            Submit
          </button>
        </div>
        <div className="flex items-center justify-center mt-10 hidden">
          <img src="src/Assets/cross.png" alt="" className="h-20 w-20" />
          <h1 className="font-bold text-2xl">
            This certificate is not valid..
          </h1>
        </div>
        <div className="flex w-screen relative justify-center items-center">
          <div className="w-full md:ml-[20%]">
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

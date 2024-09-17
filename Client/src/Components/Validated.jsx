import React from "react";
import tick from "../Assets/tick.png";

const Validated = () => {
  
  const handleHelpClick = () => {
    window.location.href = "mailto:docq.help@gmail.com";
  };

  return (
    <>
      <div className="flex flex-col items-center w-full h-auto gap-6 md:gap-8 px-6 py-8 md:mt-[2%] md:h-[650px] rounded-lg shadow-lg">
        
        <div className="flex items-center justify-center w-full space-x-4 md:space-x-6 max-w-4xl mb-6">
          <div className="flex items-center justify-center rounded-full p-4 ">
            <img src={tick} alt="Valid Certificate" className="h-12 md:h-[90px] w-12 md:w-[90px]" />
          </div>
          <h2 className="font-extrabold text-3xl md:text-5xl text-white">
            Certificate is Valid!
          </h2>
        </div>

        
        <div className="flex flex-col items-center bg-white bg-opacity-20 p-6 rounded-lg shadow-inner">
          <h1 className="underline font-bold text-2xl md:text-4xl text-white">
            Issued by: <span className="text-yellow-300">Doc-Q</span>
          </h1>
          <p className="mt-2 text-lg md:text-xl text-gray-200">
            Congratulations! Your certificate is successfully validated.
          </p>
        </div>

        
        <div className="w-full border-t-2 border-white border-opacity-40 my-6"></div>

        
        <div className="flex justify-center">
          <button
            onClick={handleHelpClick}
            className="px-8 py-3 bg-yellow-400 text-xl md:text-2xl font-bold text-gray-800 rounded-full shadow-lg transition-transform transform hover:scale-105 focus:scale-105 focus:outline-none"
          >
            Need help?
          </button>
        </div>

        
        
      </div>
    </>
  );
};

export default Validated;

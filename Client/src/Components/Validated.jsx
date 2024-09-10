import React from "react";
import tick from "../Assets/tick.png";

const Validated = () => {
  return (
    <>
      <div className="flex flex-col  items-center w-full h-auto gap-4 md:gap-7 px-4 py-6 md:mt-[2%] md:h-[610px]">
        <div className="flex items-center md:space-x-5 space-x-2 justify-center md:w-screen max-w-4xl m-10 mx-auto mb-6">
          <div className="flex items-center justify-center">
            <img src={tick} alt="Done" className="h-10 md:h-[90px] w-10 md:w-[90px]" />
          </div>
          <h2 className="font-bold text-2xl md:text-4xl">
            This certificate is valid...!
          </h2>
        </div>

        <div>
          <h1 className="underline font-bold text-xl md:text-4xl">
            Name : John Doe
          </h1>
        </div>

        <div className="flex flex-col md:flex-row w-full justify-center items-center gap-4 md:gap-7 md:space-x-[15%]">
          <h1 className="underline font-bold text-xl md:text-4xl">
            Issued by company : Doc-q
          </h1>
          <h1 className="underline font-bold text-xl md:text-4xl">
            Issued date : 24-Aug-2024
          </h1>
        </div>
        <div className="flex flex-col md:flex-row w-full justify-center items-center gap-4 md:gap-10 md:space-x-[7%] md:mt-[5%]">
          <h1 className="underline font-bold text-xl md:text-4xl">
            Email : johndoe121@gmail.com
          </h1>
          <h1 className="underline font-bold text-xl md:text-4xl">
            Contact number : 977768628892
          </h1>
        </div>
      </div>
    </>
  );
};

export default Validated;

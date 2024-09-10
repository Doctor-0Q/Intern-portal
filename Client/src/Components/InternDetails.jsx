import React from "react";
import Logo from "../Assets/Logo.png";
import { useLocation } from "react-router-dom";

const InternDetails = () => {
  const {state} = useLocation();
  const { intern } = state || {};
  console.log(intern)

  if (!intern) {
    return <p>No intern details available.</p>;
  }
  return (
    <>
      <div className="bg-gradient-to-r from-customGray to-customGray p-6 rounded-3xl w-[90%] h-[500px] md:h-[620px] mx-auto shadow-md">
        <h2 className="bg-gradient-to-r from-customBlue1 via-customBlue2 to-customBlue3 text-white text-center py-2 px-4 rounded-full font-semibold mb-4 text-3xl md:w-[24%] m-auto">
          Intern Details
        </h2>
        <div className="flex justify-between items-center mt-[4%] text-xl md:text-3xl">
          {/* Left Section for Text */}
          <div className="space-y-[10%] md:space-y-[7%] ml-[5%] w-[60%]">
            <p className="font-bold underline">
              Name : <span className="">{intern.name}</span>
            </p>
            <p className="font-bold underline">
              Email : <span className="">{intern.email}</span>
            </p>
            <p className="font-bold underline">
              Role : <span className="">{intern.role}</span>
            </p>
            <p className="font-bold underline">
              Performance : <span className="">Excellent!</span>
            </p>
            <div className="flex space-x-[4%] md:space-x-[10%] ml-[3%] md:font-semibold md:text-2xl flex-row">
              <button className="bg-gradient-to-r from-customBlue1 via-customBlue2 to-customBlue3 hover:from-blue-500 hover:to-blue-600 text-white px-4 py-2 rounded-full md:w-[300px] md:h-[40%]">
                Download Documents
              </button>
              <button className="bg-gradient-to-r from-customBlue1 via-customBlue2 to-customBlue3 hover:from-blue-500 hover:to-blue-700 text-white px-4 py-2 rounded-full w-[70%] md:w-[250px] h-[40%]">
                Get Help
              </button>
            </div>
          </div>

          {/* Right Section for Icon */}
          <div className="ml-6 flex justify-center items-center mr-[6%]  mb-[6%]">
            {/* Placeholder for Icon */}
            <img src={Logo} alt="LOGO" className="h-[200px] hidden md:block" />
          </div>
        </div>
      </div>
    </>
  );
};

export default InternDetails;

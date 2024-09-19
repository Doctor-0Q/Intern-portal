import React, { useState } from "react";
import Logo from "../Assets/Logo.png";
import { useLocation } from "react-router-dom";
import API_URL from '../config';

const InternDetails = () => {
  const { state } = useLocation();
  const { intern } = state || {};
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const handleDownloadClick = () => {
    setIsPopupVisible(true);
  };

  const closePopup = () => {
    setIsPopupVisible(false);
  };

  if (!intern) {
    return <p className="text-white text-2xl">No intern details available.</p>;
  }
  const downloadFile = (fileType) => {
    const url = `${API_URL}/download/${fileType}/${intern.id}`;
    window.open(url, '_blank');  
  };
  const handleHelpClick = () => {
    window.location.href = "mailto:docq.help@gmail.com";
  };
  return (
    <>
      <div
        className={`bg-gradient-to-r from-customGray to-customGray p-6 rounded-3xl w-[90%] h-[500px] md:h-[620px] mx-auto shadow-md ${
          isPopupVisible ? "blur-sm" : ""
        }`}
      >
        <h2 className="bg-gradient-to-r from-customBlue1 via-customBlue2 to-customBlue3 text-white text-center py-2 px-4 rounded-full font-semibold mb-4 text-3xl md:w-[24%] m-auto">
          Intern Details
        </h2>
        <div className="flex justify-between items-center mt-[4%] text-xl md:text-3xl">
          
          <div className="space-y-[10%] md:space-y-[7%] ml-[5%] w-[60%]">
            <p className="font-bold underline">
              Name: <span className="">{intern.name}</span>
            </p>
            <p className="font-bold underline">
              Email: <span className="">{intern.email}</span>
            </p>
            <p className="font-bold underline">
              Role: <span className="">{intern.role}</span>
            </p>
            <p className="font-bold underline">
              Performance: <span className="">Excellent!</span>
            </p>
            <div className="flex space-x-[4%] md:space-x-[10%] ml-[3%] md:font-semibold md:text-2xl flex-row">
              <button
                className="bg-gradient-to-r from-customBlue1 via-customBlue2 to-customBlue3 hover:from-blue-500 hover:to-blue-600 text-white px-4 py-2 rounded-full md:w-[300px] md:h-[40%]"
                onClick={handleDownloadClick}
              >
                Download Documents
              </button>
              <button onClick={handleHelpClick} className="bg-gradient-to-r from-customBlue1 via-customBlue2 to-customBlue3 hover:from-blue-500 hover:to-blue-700 text-white px-4 py-2 rounded-full w-[70%] md:w-[250px] h-[40%]">
                Get Help
              </button>
            </div>
          </div>

          
          <div className="ml-6 flex justify-center items-center mr-[6%]  mb-[6%]">
            <img src={Logo} alt="LOGO" className="h-[200px] hidden md:block" />
          </div>
        </div>
      </div>

      
      {isPopupVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center text-xl">
        <div className="bg-white p-8 rounded-lg shadow-lg w-[90%] md:w-[40%]">
          <h3 className="text-2xl font-semibold mb-4 text-center">Download Documents</h3>
          <div className="flex flex-col space-y-4">
            <button
              className="bg-gradient-to-r from-customBlue1 via-customBlue2 to-customBlue3 hover:from-blue-500 hover:to-blue-600 text-white px-4 py-2 rounded-full"
              onClick={() => downloadFile('certificate')}
            >
              Download Certificate
            </button>
            <button
              className="bg-gradient-to-r from-customBlue1 via-customBlue2 to-customBlue3 hover:from-blue-500 hover:to-blue-600 text-white px-4 py-2 rounded-full"
              onClick={() => downloadFile('lor')}
            >
              Download Letter of Recommendation
            </button>
            <button
              className="bg-gradient-to-r from-customBlue1 via-customBlue2 to-customBlue3 hover:from-blue-500 hover:to-blue-600 text-white px-4 py-2 rounded-full"
              onClick={() => downloadFile('offerLetter')}
            >
              Download Offer Letter
            </button>
          </div>
          <button
            className="mt-6 bg-red-500 text-white px-4 py-2 rounded-full w-full"
            onClick={closePopup}
          >
            Close
          </button>
        </div>
      </div>
      )}
    </>
  );
};

export default InternDetails;

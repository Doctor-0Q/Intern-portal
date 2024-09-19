import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import API_URL from '../config';

const UpdateInternId = () => {
  const navigate = useNavigate();
  const [empID, setEmpID] = useState("");
  const [showForm, setShowForm] = useState(false);

  const [name, setName] = useState("");
  const [performance, setPerformance] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [email, setEmail] = useState("");

  const offerLetterRef = useRef(null);
  const certificateRef = useRef(null);
  const LorRef = useRef(null);

  const [offerLetter, setOfferLetter] = useState(null);
  const [certificate, setCertificate] = useState(null);
  const [Lor, setLor] = useState(null);

  const [offerLetterFile, setOfferLetterFile] = useState(null);
  const [certificateFile, setCertificateFile] = useState(null);
  const [LorFile, setLorFile] = useState(null);

  const handleClick = (fileRef) => {
    fileRef.current.click();
  };

  const handleFileChange = (event, setFile, inputId) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      document.getElementById(inputId).value = selectedFile.name;
    }
  };

  const addIntern=()=>{
    navigate('../AdminPage/Add-New-Intern')
  }

  const updateDetailForm = async () => {
    try {
      console.log("Sending request with ID:", empID);
      const response = await fetch(`${API_URL}/findIntern`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: empID }),
      });
  
      const data = await response.json();
      console.log("Received response:", data);
  
      if (data.success) {
        setName(data.internDetails.name || "");
        setPerformance(data.internDetails.performance || "");
        setContactNumber(data.internDetails.p_number || "");
        setEmail(data.internDetails.email || "");
        setOfferLetterFile(data.internDetails.offerLetterPath || null); //OR USE .offerLetterFile for the file name only
        setCertificateFile(data.internDetails.certificatePath || null);
        setLorFile(data.internDetails.lorPath || null);
        setShowForm(true);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      toast('An error occurred while fetching intern data');
    }
  };  

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log("id id", empID);

    const formData = new FormData();
    formData.append('id', empID);
    formData.append('name', name);
    formData.append('performance', performance);
    formData.append('contactNumber', contactNumber);
    formData.append('email', email);
  
    if (offerLetter) formData.append('offerLetter', offerLetter);
    if (certificate) formData.append('certificate', certificate);
    if (Lor) formData.append('lor', Lor);
  
    try {
      const response = await fetch(`${API_URL}/updateIntern`, {
        method: 'PUT',
        body: formData,
      });
  
      const data = await response.json();
  
      if (data.success) {
        toast('Intern details updated successfully');
      } else {
        toast(data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      toast('An error occurred while updating intern data');
    }
  };
  

  return (
    <div className={`flex flex-col items-center w-full ${showForm ? "h-[1000px]" : "h-[480px]"}`}>
      <div>
        <h1 className="font-vollkorn text-3xl font-medium text-[#464545] text-center mt-4">
          Doc-q Admin Portal
        </h1>
      </div>

      <div className="mt-[5%]">
        <h1 className="text-[#343e49] text-2xl md:text-3xl">
          <i>Enter Intern ID to update Details</i>
        </h1>
      </div>

      <div className="relative w-64 mt-[2%]">
        <input
          onChange={(e) => setEmpID(e.target.value)}
          type="text"
          placeholder="Enter Employee ID"
          className="w-full pr-10 p-2.5 border border-gray-300 rounded-md focus:outline-none"
          value={empID}
        />
        <span className={`absolute inset-y-0 right-3 flex items-center ${empID ? "" : "hidden"}`}>
          <svg
           onClick={
            () => {
              setEmpID("")
              setShowForm(false)
            }
          }
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1"
            stroke="currentColor"
            className="h-5 w-5 hover:cursor-pointer"
          >
            <path
              d="M6.96967 16.4697C6.67678 16.7626 6.67678 17.2374 6.96967 17.5303C7.26256 17.8232 7.73744 17.8232 8.03033 17.5303L6.96967 16.4697ZM13.0303 12.5303C13.3232 12.2374 13.3232 11.7626 13.0303 11.4697C12.7374 11.1768 12.2626 11.1768 11.9697 11.4697L13.0303 12.5303ZM11.9697 11.4697C11.6768 11.7626 11.6768 12.2374 11.9697 12.5303C12.2626 12.8232 12.7374 12.8232 13.0303 12.5303L11.9697 11.4697ZM18.0303 7.53033C18.3232 7.23744 18.3232 6.76256 18.0303 6.46967C17.7374 6.17678 17.2626 6.17678 16.9697 6.46967L18.0303 7.53033ZM13.0303 11.4697C12.7374 11.1768 12.2626 11.1768 11.9697 11.4697C11.6768 11.7626 11.6768 12.2374 11.9697 12.5303L13.0303 11.4697ZM16.9697 17.5303C17.2626 17.8232 17.7374 17.8232 18.0303 17.5303C18.3232 17.2374 18.3232 16.7626 18.0303 16.4697L16.9697 17.5303ZM11.9697 12.5303C12.2626 12.8232 12.7374 12.8232 13.0303 12.5303C13.3232 12.2374 13.3232 11.7626 13.0303 11.4697L11.9697 12.5303ZM8.03033 6.46967C7.73744 6.17678 7.26256 6.17678 6.96967 6.46967C6.67678 6.76256 6.67678 7.23744 6.96967 7.53033L8.03033 6.46967ZM8.03033 17.5303L13.0303 12.5303L11.9697 11.4697L6.96967 16.4697L8.03033 17.5303ZM13.0303 12.5303L18.0303 7.53033L16.9697 6.46967L11.9697 11.4697L13.0303 12.5303ZM11.9697 12.5303L16.9697 17.5303L18.0303 16.4697L13.0303 11.4697L11.9697 12.5303ZM13.0303 11.4697L8.03033 6.46967L6.96967 7.53033L11.9697 12.5303L13.0303 11.4697Z"
              fill="#000000"
            ></path>
          </svg>
        </span>
      </div>

      <div className="mt-4">
        <button
          onClick={updateDetailForm}
          className="bg-[#063360] w-[150px] h-[37px] rounded-lg text-white text-xl"
        >
          Check
        </button>
      </div>
      <div onClick={addIntern} className={`flex flex-col items-center text-xl ${
          showForm ? "hidden" : ""
        }`}>
  <button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-4 py-2 rounded-full md:w-[300px] mt-4">
    Add an Intern
  </button>
</div>
      {showForm && (
        <form onSubmit={submitHandler} className="md:mt-[5%] mt-4 flex flex-col justify-center items-center w-full px-4 md:px-8">
          <i className="md:text-3xl text-2xl underline text-[#343e49] mb-4">
            Update your interns details
          </i>
          <div className="flex justify-center items-center flex-col w-screen mt-[3%]">
            <div className="flex md:flex-row flex-col w-full items-center justify-center md:space-x-[25%]">
              <div>
                <label htmlFor="name" className="font-bold text-lg">Name</label>
                <br />
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-64 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="performance" className="font-bold text-lg">Intern Performance</label>
                <br />
                <input
                  type="text"
                  id="performance"
                  value={performance}
                  onChange={(e) => setPerformance(e.target.value)}
                  className="w-64 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="flex md:flex-row flex-col w-full items-center justify-center md:space-x-[25%] mt-[3%]">
              <div>
                <label htmlFor="contactNumber" className="font-bold text-lg">Contact number</label>
                <br />
                <input
                  type="text"
                  id="contactNumber"
                  value={contactNumber}
                  onChange={(e) => setContactNumber(e.target.value)}
                  className="w-64 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label htmlFor="email" className="font-bold text-lg">Email</label>
                <br />
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-64 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="flex md:flex-row flex-col w-full items-center justify-center md:space-x-[25%] mt-[3%]">
              <div className="relative w-64">
                <label htmlFor="offerLetter" className="font-bold text-lg">Upload interns offer letter</label>
                <input
                  readOnly
                  onClick={() => handleClick(offerLetterRef)}
                  type="text"
                  id="offerLetter"
                  placeholder={offerLetterFile || "upload the interns offer letter"}
                  className="w-full pr-10 p-2.5 border border-gray-300 rounded-md focus:outline-none hover:cursor-pointer"
                />
                <span onClick={() => handleClick(offerLetterRef)} className="absolute inset-y-0 right-3 flex items-center mt-[10%] hover:cursor-pointer">
                  <svg fill="#000000" className="h-5 w-5" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="-23.1 -23.1 431.17 431.17" xmlSpace="preserve" stroke="#000000" strokeWidth="38.497">
                    <g id="SVGRepo_iconCarrier">
                      <g id="Upload">
                        <path d="M372.939,264.641c-6.641,0-12.03,5.39-12.03,12.03v84.212H24.061v-84.212c0-6.641-5.39-12.03-12.03-12.03 S0,270.031,0,276.671v96.242c0,6.641,5.39,12.03,12.03,12.03h360.909c6.641,0,12.03-5.39,12.03-12.03v-96.242 C384.97,270.019,379.58,264.641,372.939,264.641z"></path>
                        <path d="M117.067,103.507l63.46-62.558v235.71c0,6.641,5.438,12.03,12.151,12.03c6.713,0,12.151-5.39,12.151-12.03V40.95 l63.46,62.558c4.74,4.704,12.439,4.704,17.179,0c4.74-4.704,4.752-12.319,0-17.011l-84.2-82.997 c-4.692-4.656-12.584-4.608-17.191,0L99.888,86.496c-4.752,4.704-4.74,12.319,0,17.011 C104.628,108.211,112.327,108.211,117.067,103.507z"></path>
                      </g>
                    </g>
                  </svg>
                </span>
                <input
                  type="file"
                  ref={offerLetterRef}
                  name="offerLetter"
                  style={{ display: "none" }}
                  onChange={(event) => handleFileChange(event, setOfferLetter, "offerLetter")}
                />
              </div>
              <div className="relative w-64">
                <label htmlFor="certificate" className="font-bold text-lg">Upload interns Certificate</label>
                <input
                  readOnly
                  onClick={() => handleClick(certificateRef)}
                  type="text"
                  id="certificate"
                  placeholder={certificateFile || "upload the interns Certificate"}
                  className="w-64 pr-10 p-2.5 border border-gray-300 rounded-md focus:outline-none hover:cursor-pointer"
                />
                <span onClick={() => handleClick(certificateRef)} className="absolute inset-y-0 right-3 flex items-center mt-[10%] hover:cursor-pointer">
                <svg fill="#000000" className="h-5 w-5" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="-23.1 -23.1 431.17 431.17" xmlSpace="preserve" stroke="#000000" strokeWidth="38.497">
                    <g id="SVGRepo_iconCarrier">
                      <g id="Upload">
                        <path d="M372.939,264.641c-6.641,0-12.03,5.39-12.03,12.03v84.212H24.061v-84.212c0-6.641-5.39-12.03-12.03-12.03 S0,270.031,0,276.671v96.242c0,6.641,5.39,12.03,12.03,12.03h360.909c6.641,0,12.03-5.39,12.03-12.03v-96.242 C384.97,270.019,379.58,264.641,372.939,264.641z"></path>
                        <path d="M117.067,103.507l63.46-62.558v235.71c0,6.641,5.438,12.03,12.151,12.03c6.713,0,12.151-5.39,12.151-12.03V40.95 l63.46,62.558c4.74,4.704,12.439,4.704,17.179,0c4.74-4.704,4.752-12.319,0-17.011l-84.2-82.997 c-4.692-4.656-12.584-4.608-17.191,0L99.888,86.496c-4.752,4.704-4.74,12.319,0,17.011 C104.628,108.211,112.327,108.211,117.067,103.507z"></path>
                      </g>
                    </g>
                  </svg>
                </span>
                <input
                  type="file"
                  ref={certificateRef}
                  name="certificate"
                  style={{ display: "none" }}
                  onChange={(event) => handleFileChange(event, setCertificate, "certificate")}
                />
              </div>
            </div>
            <div className="flex md:flex-row flex-col w-full items-center justify-center md:space-x-[25%] mt-[3%]">
              <div className="relative w-64">
                <label htmlFor="Lor" className="font-bold text-lg">Upload interns LOR</label>
                <input
                  readOnly
                  onClick={() => handleClick(LorRef)}
                  type="text"
                  id="lor"
                  placeholder={LorFile || "upload the interns LOR"}
                  className="w-full pr-10 p-2.5 border border-gray-300 rounded-md focus:outline-none hover:cursor-pointer"
                />
                <span onClick={() => handleClick(LorRef)} className="absolute inset-y-0 right-3 flex items-center mt-[10%] hover:cursor-pointer">
                  <svg fill="#000000" className="h-5 w-5" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" viewBox="-23.1 -23.1 431.17 431.17" xmlSpace="preserve" stroke="#000000" strokeWidth="38.497">
                    <g id="SVGRepo_iconCarrier">
                      <g id="Upload">
                        <path d="M372.939,264.641c-6.641,0-12.03,5.39-12.03,12.03v84.212H24.061v-84.212c0-6.641-5.39-12.03-12.03-12.03 S0,270.031,0,276.671v96.242c0,6.641,5.39,12.03,12.03,12.03h360.909c6.641,0,12.03-5.39,12.03-12.03v-96.242 C384.97,270.019,379.58,264.641,372.939,264.641z"></path>
                        <path d="M117.067,103.507l63.46-62.558v235.71c0,6.641,5.438,12.03,12.151,12.03c6.713,0,12.151-5.39,12.151-12.03V40.95 l63.46,62.558c4.74,4.704,12.439,4.704,17.179,0c4.74-4.704,4.752-12.319,0-17.011l-84.2-82.997 c-4.692-4.656-12.584-4.608-17.191,0L99.888,86.496c-4.752,4.704-4.74,12.319,0,17.011 C104.628,108.211,112.327,108.211,117.067,103.507z"></path>
                      </g>
                    </g>
                  </svg>
                </span>
                <input
                  type="file"
                  ref={LorRef}
                  name="lor"
                  style={{ display: "none" }}
                  onChange={(event) => handleFileChange(event, setLor, "lor")}
                />
              </div>
            </div>
          </div>
          <div className="md:mt-[2%] mt-[5%] w-60 h-12 text-2xl rounded-2xl bg-[#063360] text-white font-medium transition-all duration-300 ease-in-out hover:bg-[#041e36] cursor-pointer flex justify-center">
            <button type="submit" className="p-2">Submit</button>
          </div>
        </form>
      )}
    </div>
  );
};

export default UpdateInternId;

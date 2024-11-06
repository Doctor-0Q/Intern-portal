import { Calendar, X, Upload, Check, AlertCircle } from 'lucide-react';
import React, { useState, useRef } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const AddminAddIntern = () => {
  const [formData, setFormData] = useState({
    internID: '',
    password: '',
    forename: '',
    contactNo: '',
    email: '',
    dateOfJoining: '',
    gender: '',
    performance: '',
    documents: {
      offerLetter: null,
      certificate: null,
      recommendation: null
    }
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
    performance: ''
  });

  const offerLetterRef = useRef(null);
  const certificateRef = useRef(null);
  const recommendationRef = useRef(null);

  const [uploadedFiles, setUploadedFiles] = useState({
    offerLetter: '',
    certificate: '',
    recommendation: ''
  });

  const performanceOptions = [
    { value: 'NA', label: 'NA', bgColor: 'bg-gray-200' },
    { value: 'Bad', label: 'Bad', bgColor: 'bg-red-200' },
    { value: 'Average', label: 'Average', bgColor: 'bg-yellow-200' },
    { value: 'Good', label: 'Good', bgColor: 'bg-blue-200' },
    { value: 'Perfect', label: 'Perfect', bgColor: 'bg-green-200' }
  ];

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!email) {
      setErrors(prev => ({ ...prev, email: 'Email is required' }));
      return false;
    }
    if (!emailRegex.test(email)) {
      setErrors(prev => ({ ...prev, email: 'Please enter a valid email address' }));
      return false;
    }
    setErrors(prev => ({ ...prev, email: '' }));
    return true;
  };



  const handlePerformanceSelect = (value) => {
    setFormData(prev => ({ ...prev, performance: value }));
    if (!value) {
      setErrors(prev => ({ ...prev, performance: 'Performance rating is required' }));
    } else {
      setErrors(prev => ({ ...prev, performance: '' }));
    }
  };

  const handleFileUpload = (type, e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('File size should not exceed 5MB');
        return;
      }
      setFormData(prev => ({
        ...prev,
        documents: {
          ...prev.documents,
          [type]: file
        }
      }));
      setUploadedFiles(prev => ({
        ...prev,
        [type]: file.name
      }));
    }
  };



const handleSubmit = async (e) => {
  e.preventDefault();

  // Validate email, password strength, and performance
  const isEmailValid = validateEmail(formData.email);
  const isPerformanceValid = !!formData.performance;

  if (!isPerformanceValid) {
    setErrors((prev) => ({ ...prev, performance: 'Performance rating is required' }));
  }

  
  if (isEmailValid && isPerformanceValid) {
    try {
      
      const response = await axios.post('http://localhost:8080/api/v1/addIntern', formData);
      if(response.data.success){

        toast.success("Intern added successfully")
        resetForm()
      }
      else{
        toast.error("Failed to add intern")
      }

      
      setErrors({});
     

    } catch (error) {
      toast.error(error.response.data.message)
      setErrors((prev) => ({ ...prev, api: 'Failed to submit form. Please try again later.' }));
    }
  } else {
    console.log('Form has errors');
  }
};


  const resetForm = () => {
    setFormData({
      internID: '',
      password: '',
      forename: '',
      contactNo: '',
      email: '',
      dateOfJoining: '',
      gender: '',
      performance: '',
      documents: {
        offerLetter: null,
        certificate: null,
        recommendation: null
      }
    });
    setErrors({
      email: '',
      password: '',
      performance: ''
    });
    setUploadedFiles({
      offerLetter: '',
      certificate: '',
      recommendation: ''
    });
  };

  const triggerFileInput = (ref) => {
    ref.current.click();
  };

  return (
    <div className="w-screen mx-auto p-6 bg-slate-50 flex jstify-center items-center flex-col">
      <div className="flex justify-between items-center mb-6 w-[90%] bg-white p-2">
        <h1 className="text-xl font-semibold">Add New Intern</h1>
        <div className="space-x-2">
          <button
            type="button"
            className="px-4 py-2 border rounded hover:bg-gray-50"
            onClick={resetForm}
          >
            Cancel
          </button>
          <button
            type="button"
            className="px-4 py-2 bg-blue-700 text-white rounded hover:bg-blue-800"
            onClick={handleSubmit}
          >
            Save
          </button>
        </div>
      </div>

      <form className="space-y-6 bg-white rounded-lg p-6 shadow-sm" onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-6">
          {/* Intern ID */}
          <div className="flex items-center space-x-4">
            <label className="w-24 text-sm font-medium">Intern ID</label>
            <input
              type="text"
              className="flex-1 border rounded p-2"
              value={formData.internID}
              onChange={(e) => setFormData({ ...formData, internID: e.target.value })}
            />
          </div>

          {/* Password */}
          <div className="flex items-center space-x-4">
            <label className="w-24 text-sm font-medium">Password</label>
            <div className="flex-1">
              <input
                type="password"
                className={`w-full border rounded p-2 ${errors.password ? 'border-red-500' : ''}`}
                value={formData.password}
                onChange={(e) => {
                  setFormData({ ...formData, password: e.target.value });
                }}
              />
              
            </div>
          </div>
        </div>

        {/* Forename */}
        <div className="flex items-center space-x-4">
          <label className="w-24 text-sm font-medium">Forename</label>
          <div className="flex-1 relative">
            <input
              type="text"
              className="w-[70%] border rounded p-2 pr-8"
              value={formData.forename}
              onChange={(e) => setFormData({ ...formData, forename: e.target.value })}
            />
            {formData.forename && (
              <button
                type="button"
                className="absolute right-2 top-2.5 text-gray-400 hover:text-gray-600"
                onClick={() => setFormData({ ...formData, forename: '' })}
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>

        {/* Contact No */}
        <div className="flex items-center space-x-4">
          <label className="w-24 text-sm font-medium">Contact No</label>
          <div className="flex-1 relative">
            <input
              type="tel"
              className="w-[70%]  border rounded p-2 pr-8"
              value={formData.contactNo}
              onChange={(e) => setFormData({ ...formData, contactNo: e.target.value })}
            />
            {formData.contactNo && (
              <button
                type="button"
                className="absolute right-2 top-2.5 text-gray-400 hover:text-gray-600"
                onClick={() => setFormData({ ...formData, contactNo: '' })}
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>

        {/* Email */}
        <div className="flex items-center space-x-4">
          <label className="w-24 text-sm font-medium">Email</label>
          <div className="flex-1">
            <input
              type="email"
              className={`w-[60%]  border rounded p-2 ${errors.email ? 'border-red-500' : ''}`}
              value={formData.email}
              onChange={(e) => {
                setFormData({ ...formData, email: e.target.value });
                validateEmail(e.target.value);
              }}
              onBlur={(e) => validateEmail(e.target.value)}
            />
            {errors.email && (
              <div className="text-red-500 text-sm mt-1 flex items-center">
                <AlertCircle size={16} className="mr-1" />
                {errors.email}
              </div>
            )}
          </div>
        </div>

        {/* Date of Joining */}
        <div className="flex items-center space-x-4">
          <label className="w-24 text-sm font-medium">Date of Joi ning</label>
          <div className="flex-1 relative">
            <input
              type="date"
              className="w-full border rounded p-2 cursor-pointer"
              value={formData.dateOfJoining}
              onChange={(e) => setFormData({ ...formData, dateOfJoining: e.target.value })}
            />
            <Calendar className="absolute right-2 top-2.5 text-gray-400 pointer-events-none" size={20} />
          </div>
        </div>

        {/* Gender */}
        <div className="flex items-center space-x-4">
          <label className="w-24 text-sm font-medium">Gender</label>
          <div className="flex-1">
            <div className="space-x-2">
              {['male', 'female'].map((gender) => (
                <button
                  key={gender}
                  type="button"
                  className={`px-4 py-2 rounded ${formData.gender === gender
                      ? 'bg-gray-200'
                      : 'bg-gray-100 hover:bg-gray-200'
                    }`}
                  onClick={() => setFormData({ ...formData, gender })}
                >
                  {gender.charAt(0).toUpperCase() + gender.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Performance Rating */}
        <div className="flex items-center space-x-4">
          <label className="w-24 text-sm font-medium">Performance</label>
          <div className="flex-1">
            <div className="flex space-x-2">
              {performanceOptions.map(({ value, label, bgColor }) => (
                <button
                  key={value}
                  type="button"
                  className={`px-4 py-2 rounded transition-colors ${bgColor} ${formData.performance === value
                      ? 'ring-2 ring-offset-2 ring-blue-500'
                      : 'hover:opacity-80'
                    }`}
                  onClick={() => handlePerformanceSelect(value)}
                >
                  {label}
                </button>
              ))}
            </div>
            {errors.performance && (
              <div className="text-red-500 text-sm mt-1 flex items-center">
                <AlertCircle size={16} className="mr-1" />
                {errors.performance}
              </div>
            )}
          </div>
        </div>

        
        {/* Documents Section */}
        <div className="space-y-4">
          <h3 className="font-medium">Upload Documents</h3>

          <div className="space-y-3">
            <input
              type="file"
              ref={offerLetterRef}
              className="hidden"
              onChange={(e) => handleFileUpload('offerLetter', e)}
              accept=".pdf,.doc,.docx"
            />
            <input
              type="file"
              ref={certificateRef}
              className="hidden"
              onChange={(e) => handleFileUpload('certificate', e)}
              accept=".pdf,.doc,.docx"
            />
            <input
              type="file"
              ref={recommendationRef}
              className="hidden"
              onChange={(e) => handleFileUpload('recommendation', e)}
              accept=".pdf,.doc,.docx"
            />

            {[
              { label: 'Offer Letter', ref: offerLetterRef, key: 'offerLetter' },
              { label: 'Certificate', ref: certificateRef, key: 'certificate' },
              { label: 'Letter Of Recommendation', ref: recommendationRef, key: 'recommendation' }
            ].map((doc) => (
              <div key={doc.key} className="flex items-center space-x-4">
                <span className="w-24 text-sm font-medium">{doc.label}</span>
                <div className="flex-1">
                  <button
                    type="button"
                    onClick={() => triggerFileInput(doc.ref)}
                    className="flex items-center space-x-2 ml-3 px-4 py-2 border rounded text-sm hover:bg-gray-50 w-[20vw]"
                  >
                    <span className="flex-1 text-left">
                      {uploadedFiles[doc.key] || 'Upload Documents'}
                    </span>
                    <Upload size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddminAddIntern;
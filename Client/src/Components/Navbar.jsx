import React from "react";
import Logo from "../Assets/Logo.png";
import { NavLink } from "react-router-dom";

export const Navbar = () => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center w-full bg-transparent mt-2">
      <div className="flex items-center mb-2 md:mb-0">
        <NavLink to="/">
          <img
            src={Logo}
            alt="Doc-Q InternsPortal"
            className="w-36 h-16 md:w-72 md:h-28 transition-transform duration-300 ease-in-out"
          />
        </NavLink>
      </div>
      <div className="flex items-center justify-center mb-2 md:mb-0 md:ml-4">
        <h1 className="font-vollkorn text-3xl md:text-6xl font-medium text-[#464545] text-center leading-tight md:leading-[89.15px] ">
          Intern Portal
        </h1>
      </div>
      <ul className="font-nunito text-[18px] md:text-[25px] font-medium leading-[28px] md:leading-[34.1px] bg-white bg-opacity-30 rounded-full flex items-center gap-4 md:gap-12 list-none text-lg mt-4 md:mt-0 px-6 md:px-10 py-3 md:h-16">
        <li className="flex items-center justify-center cursor-pointer transition-all duration-200">
          <NavLink
            to="/"
            exact
            className={({ isActive }) =>
              `text-gray-700 transform transition-transform duration-300 ${
                isActive
                  ? "text-[#000000] font-bold scale-125 -translate-x-1 translate-y-1"
                  : ""
              }`
            }
          >
            Home
          </NavLink>
        </li>
        <li className="flex items-center justify-center cursor-pointer transition-all duration-200">
          <NavLink
            to="/ValidatePage"
            className={({ isActive }) =>
              `text-gray-700 transform transition-transform duration-300 ${
                isActive
                  ? "text-[#000000] font-bold scale-125 translate-x-0 translate-y-1"
                  : ""
              }`
            }
          >
            Validate
          </NavLink>
        </li>
        <li className="flex items-center justify-center cursor-pointer transition-all duration-200">
          <NavLink
            to="/AdminPage"
            className={({ isActive }) =>
              `text-gray-700 transform transition-transform duration-300 ${
                isActive
                  ? "text-[#000000] font-bold scale-125 translate-x-2 translate-y-1"
                  : ""
              }`
            }
          >
            Admin
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;

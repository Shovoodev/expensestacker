import React from "react";
import { User, Bell } from "lucide-react";
import { NavLink } from "react-router";
const Navbar = () => {
  return (
    <>
      <header className="flex rounded-lg justify-between items-center px-8 py-4 bg-gray-100 shadow-sm">
        <div className="flex items-center">
          <div className="text-xl font-bold text-black">
            <span className="text-white">Expense</span>Tracker
          </div>
        </div>
        <div className="space-x-4">
          <button className="text-white  hover:px-4  hover:py-2  hover:rounded-md hover:bg-gray-900 font-medium">
            <NavLink>LogIn</NavLink>
          </button>
          <button className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-900">
            <NavLink>SignUp</NavLink>
          </button>
          <span>EN</span>
        </div>
      </header>
    </>
  );
};

export default Navbar;

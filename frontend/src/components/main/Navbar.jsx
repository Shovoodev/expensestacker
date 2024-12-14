import React  from "react";
import { User, Bell } from "lucide-react";
import { NavLink } from "react-router";
const Navbar = () => {
  return (
    <>
      <nav className="bg-gray-800 flex justify-between  px-4 py-3">
      <h1 class="text-3xl font-bold  text-white">Expense Tracker</h1>
      <div className="flex gap-3">
            <Bell color="white" className="w-7 h-7 mt-1" />
            <button className=" text-white group">
              <NavLink to="/signin">

              <User  className="w-7 h-7 mt-1" color="white" />
              </NavLink>
            </button>
      </div>
      </nav>
    </>
  );
};

export default Navbar;

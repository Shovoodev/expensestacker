import React ,{ useState, useEffect, useRef }  from "react";
import { User, Bell } from "lucide-react";
import { NavLink } from "react-router";
import Button from "../ui/Button";
const Navbar = () => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);
  const toggleDropdown = () => {
    setIsDropdownVisible((prev) => !prev);
  };
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownVisible(false);
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  return (
    <>
      <nav className="bg-gray-800 w-full px-4 py-3 flex justify-between">
        <div className="flex items-center text-xl">
          <span className="text-white font-semibold"> Expense Tracker</span>
        </div>
        <div className=" flex items-center gap-x-5">
          <div className="relative mb:w-65">
            <span className="relative mb:absolute inset-y-0 left-0 items-center pl-2">
              <button className="p-1 focus:outline-none text-white md:text-black"></button>
            </span>
          </div>
          <div className="text-white">
            <Bell className="w-7 h-7 mt-1" />
          </div>
          <div className=" relative">
            <button className=" text-white group">
              <NavLink to="/signin">

              <User className="w-7 h-7 mt-1" color="white" />
              </NavLink>
              
            </button>
          </div>
            
        </div>
      </nav>
    </>
  );
};

export default Navbar;

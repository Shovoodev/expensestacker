import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { User, Bell } from "lucide-react";

const GroupeNavbar = ({client}) => {
  const navigate = useNavigate();

  const handleLogOut = async() => {
    await fetch("http://localhost:3333/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
     setTimeout(() => {
        navigate("/")
      }, 1000)
  }
  return (
    <>
      <nav className="bg-[#f8f9fa] flex justify-between gap-4 mb-4 px-4 py-3">
      <h1 class="text-3xl font-bold  text-gray-800">Expense Tracker</h1>
      <div className="flex gap-3">
            <Bell color="black" className="w-7 h-7 mt-1" />
            <button className=" text-white group">
              <NavLink to="/signin">

              <User  className="w-7 h-7 mt-1" color="black" />
              </NavLink>
            </button>
      </div>
      </nav>
      <p class="text-2xl font-bold ml-4 text-gray-800 mb-4" > {`Welcome ${client}`}</p>

    </>
  );
};

export default GroupeNavbar;

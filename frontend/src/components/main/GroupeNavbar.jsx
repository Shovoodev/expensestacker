import React from "react";
import { useNavigate } from "react-router-dom";
import { User, Bell } from "lucide-react";

const GroupeNavbar = () => {
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
      <nav className="bg-gray-800 w-[80%] ml-[20%] px-4 py-3">
        
        <div className=" flex items-center justify-end gap-x-5">
          
          <div className="text-white">
            <Bell className="w-7 h-7 mt-1" />
          </div>
          <div className=" relative">
            <button onClick={handleLogOut}  className=" text-white group">
              <User className="w-7 h-7 mt-1" color="white" />
            
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default GroupeNavbar;

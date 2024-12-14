import { Bell, User } from "lucide-react";
import React from "react";
import { NavLink } from "react-router";
import { useUser } from "../hook/use-user";

const GeneralNavbar = ({ fieldHeader, className, client }) => {
  return (
    <>
      <nav
        className={
          "bg-[#f8f9fa] flex justify-between gap-4 mb-4 px-4 py-3 " + className
        }
      >
        <div>
          {fieldHeader} {client}
        </div>
        <div className="flex gap-3 ">
          <Bell color="black" className="w-7 h-7 mt-1" />
          <button className=" text-white group">
            <NavLink to="/">
              <User className="w-7 h-7 mt-1" color="black" />
            </NavLink>
          </button>
        </div>
      </nav>
    </>
  );
};

export default GeneralNavbar;

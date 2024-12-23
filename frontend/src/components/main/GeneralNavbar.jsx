import { Bell, User } from "lucide-react";
import React from "react";
import { NavLink } from "react-router";
import { useNavigate } from "react-router-dom";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";

const GeneralNavbar = ({ className }) => {
  const navigate = useNavigate();
  const handleClick = async () => {
    await fetch(`http://localhost:3333/logout`, {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(() => console.log("loged out"))
      .then(() => navigate("/"));
  };
  return (
    <>
      <nav
        className={
          "bg-gradient-to-b from-slate-50 shadow-lg to-slate-100 p-2 flex justify-between gap-4  " +
          className
        }
      >
        <div className="flex items-center">
          <div className="text-2xl font-bold text-black">
            <NavLink to="/user">
              <span className="text-gray-600">Expense</span>Tracker
            </NavLink>
          </div>
        </div>
        <div className="flex gap-3 p-1 ">
          <Bell color="black" className="w-7 h-7 mt-1 hover:scale-125" />
          <Menu>
            <MenuButton>
              <User className="w-7 h-7 mt-1 hover:scale-125" color="black" />
            </MenuButton>
            <MenuItems anchor="bottom" className="p-4 rounded">
              <MenuItem>
                <NavLink className="block data-[focus]:bg-blue-100 hover:rounded p-4 text-lg">
                  Profile
                </NavLink>
              </MenuItem>
              <MenuItem>
                <button
                  onClick={handleClick}
                  className="block data-[focus]:bg-blue-100 font-bold text-lg p-4"
                >
                  SignOut
                </button>
              </MenuItem>
            </MenuItems>
          </Menu>
        </div>
      </nav>
    </>
  );
};

export default GeneralNavbar;

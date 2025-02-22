import { Bell, Settings, SquarePlus, Trash2, User } from "lucide-react";
import React from "react";
import { NavLink } from "react-router";
import { useNavigate } from "react-router-dom";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";

const GroupeNavbar = ({ className, isOwner, deleteCurrentGroup }) => {
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
          " relative bg-gradient-to-b from-slate-50 shadow-lg to-slate-100 p-2 flex justify-between gap-4  " +
          className
        }
      >
        <div className="flex items-center p-2">
          <div className="text-2xl font-bold text-black">
            <NavLink to="/user">
              <span className="text-gray-600">Expense</span>Tracker
            </NavLink>
          </div>
        </div>
        <div className="flex gap-3 p-1 ">
          <Menu>
            <MenuButton>
              <Bell color="black" className="w-7 h-7 mt-1 " />
            </MenuButton>
          </Menu>

          <Menu>
            <MenuButton>
              <User className="w-7 h-7 mt-1 " color="black" />
            </MenuButton>
            <MenuItems
              anchor="bottom"
              className="w-44 flex-col   justify-center rounded-xl border border-white/5 bg-gray-300 p-2 text-sm/6 transition duration-100 ease-out  focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
            >
              <MenuItem>
                <button
                  onClick={handleClick}
                  className="group flex w-full items-center gap-2 hover:bg-gray-700 hover:text-white rounded-lg py-1.5 px-3 "
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

export default GroupeNavbar;

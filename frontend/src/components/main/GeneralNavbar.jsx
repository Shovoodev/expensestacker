import { Bell, User } from "lucide-react";
import React from "react";
import { NavLink } from "react-router";
import { useNavigate } from "react-router-dom";
import { useUser } from "../hook/use-user";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";

const GeneralNavbar = ({ fieldHeader, className, client }) => {
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
          "bg-[#f8f9fa] flex justify-between gap-4 mb-4 px-4 py-3 " + className
        }
      >
        <div className={className}>
          {fieldHeader} {client}
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

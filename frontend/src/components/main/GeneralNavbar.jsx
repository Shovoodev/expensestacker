import { Bell, Settings, SquarePlus, Trash2, User } from "lucide-react";
import React from "react";
import { NavLink } from "react-router";
import { useNavigate } from "react-router-dom";
import { Menu, MenuButton, MenuItems, MenuItem } from "@headlessui/react";

const GeneralNavbar = ({ className, isOwner, deleteCurrentGroup }) => {
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
            <MenuButton className="inline-flex items-center gap-2 rounded-md px-2 text-sm/6 font-semibold text-white shadow-inner shadow-white/10 focus:outline-none   data-[focus]:outline-1 data-[focus]:outline-white">
              <Settings size={32} color="black" />
            </MenuButton>
            <MenuItems
              anchor="bottom-end"
              className="w-44 flex-col  justify-center rounded-xl border border-white/5 bg-gray-300 p-2 text-sm/6 transition duration-100 ease-out  focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
            >
              <MenuItem className="px-8 py-5">
                {isOwner ? (
                  <>
                    <button
                      onClick={deleteCurrentGroup}
                      className="group flex hover:bg-red-600 hover:text-white w-full items-center gap-2 rounded-lg py-1.5 px-3 "
                    >
                      <Trash2 size={32} />
                      Delete Group
                    </button>
                  </>
                ) : (
                  <></>
                )}
              </MenuItem>
              <MenuItem>
                <button className="group flex w-full items-center gap-2 hover:bg-gray-700 hover:text-white rounded-lg py-1.5 px-3 ">
                  <SquarePlus size={32} />
                  Update Group
                </button>
              </MenuItem>
            </MenuItems>
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
              <MenuItem>
                <NavLink to="/user">
                  <span className="group flex w-full items-center gap-2 hover:bg-gray-700 hover:text-white rounded-lg py-1.5 px-3 ">
                    Profile
                  </span>
                </NavLink>
              </MenuItem>
            </MenuItems>
          </Menu>
        </div>
      </nav>
    </>
  );
};

export default GeneralNavbar;

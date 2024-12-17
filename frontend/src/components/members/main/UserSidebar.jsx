import React from "react";
import GeneralNavbar from "../../main/GeneralNavbar";
import Surface from "./Surface";
import { NavLink } from "react-router";
import { useUser } from "../../hook/use-user";

const UserSidebar = ({client}) => {
    const { user } = useUser()
  return (
    <>
      <GeneralNavbar
        fieldHeader="User"
        className=" flex justify-center items-center"
      />
      <aside className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0">
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            <li>
              <NavLink to={"/user"} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <span className="ms-3"> Dashboard</span>
              </NavLink>
            </li>
            <li>
              <NavLink className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <span className="flex-1 ms-3 whitespace-nowrap">Inbox</span>
                <span className="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">
                  0
                </span>
              </NavLink>
            </li>
            <li>
              <NavLink className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <span className="flex-1 ms-3 whitespace-nowrap">{user?.username}'s Profile</span>
              </NavLink>
            </li>
            <li>
              <NavLink className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <span className="flex-1 ms-3 whitespace-nowrap">{user?.username}'s Groups</span>
              </NavLink>
            </li>
            <li>
              <NavLink className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
                <span className="flex-1 ms-3 whitespace-nowrap">Sign Out</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </aside>
      <Surface />
    </>
  );
};

export default UserSidebar;

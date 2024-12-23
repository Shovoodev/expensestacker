import React from "react";
import GeneralNavbar from "../../main/GeneralNavbar";
import Surface from "./Surface";
import { NavLink } from "react-router";
import { useUser } from "../../hook/use-user";
import {
  Group,
  Inbox,
  LayoutDashboardIcon,
  LogOut,
  User,
  UserIcon,
} from "lucide-react";

const UserSidebar = ({ client }) => {
  const { user } = useUser();
  return (
    <>
      <div className="flex-col">
        <div>
          <GeneralNavbar
            fieldHeader="User"
            className=" flex justify-center items-center"
          />
        </div>
        <div>
          <aside className="fixed top-0 left-0 z-40 mt-14 h-screen transition-transform bg-gray-50 dark:bg-gray-800">
            <div className="h-full px-3 py-4 overflow-y-auto">
              <ul className="space-y-2 font-medium">
                <li>
                  <NavLink
                    to={"/user"}
                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                  >
                    <LayoutDashboardIcon className="w-6 h-6" />
                    <span className="hidden sm:inline ml-3">Dashboard</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={"/inbox"}
                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                  >
                    <Inbox className="w-6 h-6" />
                    <span className="hidden sm:inline ml-3">Inbox</span>
                    <span className="inline-flex items-center justify-center w-3 h-3 p-3 ml-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">
                      0
                    </span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={"/profile"}
                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                  >
                    <User className="w-6 h-6" />
                    <span className="hidden sm:inline ml-3">
                      {user?.username}'s Profile
                    </span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={"/groups"}
                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                  >
                    <Group className="w-6 h-6" />
                    <span className="hidden sm:inline ml-3">
                      {user?.username}'s Groups
                    </span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to={"/logout"}
                    className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
                  >
                    <LogOut className="w-6 h-6" />
                    <span className="hidden sm:inline ml-3">Sign Out</span>
                  </NavLink>
                </li>
              </ul>
            </div>
          </aside>
        </div>
      </div>

      <Surface />
    </>
  );
};

export default UserSidebar;

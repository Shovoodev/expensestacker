import React, { useState } from "react";
import { NavLink, useParams } from "react-router";
import { useUser } from "../hook/use-user";
import {
  Inbox,
  User,
  Users,
  LogOut,
  Euro,
  SidebarClose,
  SidebarOpen,
} from "lucide-react";
import NavList from "../ui/NavList";

const Sidebar = () => {
  const [openSidebar, setOpenSidebar] = useState(true);
  const { user } = useUser();
  const { groupId } = useParams();
  const toggle = () => setOpenSidebar(!openSidebar);
  return (
    <aside
      className={`bg-gray-50 shadow-lg relative text-left z-40 h-screen 
      ${
        openSidebar
          ? " w-52 absolute top-0 left-0  inline-block transition-all duration-500 rounded-lg  -translate-x-36 sm:translate-x-0 fade-out "
          : "w-12 top-0 left-0 z-20  h-full transition-all duration-500 transform -translate-x-2 bg-white shadow-lg peer-checked:translate-x-0 "
      }`}
    >
      <div className="flex justify-between transition">
        {openSidebar ? (
          <div className="p-4 flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-purple-200 flex items-center justify-center">
              <img
                src="/default.jpg"
                alt="User"
                className="w-full h-full rounded-full"
              />
            </div>
            <div>
              <h2 className="font-semibold text-gray-800">{user?.username}</h2>
              <p className="text-sm text-gray-500">{user?.email}</p>
            </div>
          </div>
        ) : (
          <></>
        )}

        <button onClick={toggle} className="">
          {openSidebar ? (
            <SidebarClose />
          ) : (
            <div className=" ml-2">
              <SidebarOpen />
            </div>
          )}
        </button>
      </div>
      <div className="h-full bg-gray-50">
        <ul className="space-y-2 font-medium">
          <NavList
            address="/"
            className="p-2 mt-7 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group "
            openSidebar={openSidebar}
            children={<Inbox color="black" />}
            header="Notification"
          />
          <NavList
            address="/profile"
            className="p-2 mt-7 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group "
            openSidebar={openSidebar}
            children={<User color="black" />}
            header="Profile"
          />
          <NavList
            address="/groups"
            openSidebar={openSidebar}
            className="p-2 mt-7 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group "
            children={<Users color="black" />}
            header="Group"
          />

          <NavList
            openSidebar={openSidebar}
            className="p-2 mt-7 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group "
            children={<LogOut color="black" />}
            header="LogOut"
          />
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;

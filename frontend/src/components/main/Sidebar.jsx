import React, { useState } from "react";
import { NavLink } from "react-router";
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
  const toggle = () => setOpenSidebar(!openSidebar);
  return (
    <aside
      className={`bg-gray-50 shadow-lg relative text-left z-40 h-screen transition-transform -translate-x-full sm:translate-x-0
      ${openSidebar ? " w-52" : "w-12 "}`}
    >
      <div className="flex justify-between">
        {openSidebar ? (
          <div className="ml-3 mt-2 bg-gray-50 uppercase text-xl font-mono">
            {user?.username}
          </div>
        ) : (
          <></>
        )}

        <button onClick={toggle} className="">
          {openSidebar ? (
            <SidebarClose />
          ) : (
            <div className=" ml-2">
              {" "}
              <SidebarOpen />
            </div>
          )}
        </button>
      </div>
      <div className="h-full  overflow-y-auto bg-gray-50">
        <ul className="space-y-2 font-medium">
          <NavList
            address="/"
            openSidebar={openSidebar}
            children={<Inbox color="black" />}
            header="inbox"
          />
          <NavList
            address="/"
            openSidebar={openSidebar}
            children={<User color="black" />}
            header="Profile"
          />
          <NavList
            address="/groups"
            openSidebar={openSidebar}
            children={<Users color="black" />}
            header="Group"
          />
          <NavList
            address="/groups"
            openSidebar={openSidebar}
            children={<Euro color="black" />}
            header="Your Expenses"
          />
          <NavList
            openSidebar={openSidebar}
            children={<LogOut color="black" />}
            header="LogOut"
          />
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;

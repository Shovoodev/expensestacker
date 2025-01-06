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
import Sidebar from "../../main/Sidebar";

const UserSidebar = ({ client }) => {
  const { user } = useUser();
  return (
    <>
      <div className="flex">
        <Sidebar />
        <div>
          <Surface />
        </div>
      </div>
    </>
  );
};

export default UserSidebar;

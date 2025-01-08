import React, { useState } from "react";
import { useUser } from "../hook/use-user";
import {
  House,
  ChartArea,
  Bell,
  SidebarClose,
  SidebarOpen,
  HandCoins,
  Pocket,
} from "lucide-react";

const ProductSidebar = () => {
  const { user } = useUser();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const toggler = () => {
    setIsCollapsed(!isCollapsed);
  };
  return (
    <aside
      className={`h-[90vh] bg-gray-100 ${
        isCollapsed ? "w-16" : " w-56"
      } transition-all duration-300 flex flex-col justify-between`}
    >
      <div>
        <div className=" flex justify-end">
          <button onClick={toggler} className=" flex justify-end">
            {!isCollapsed ? (
              <SidebarClose />
            ) : (
              <div className=" ml-2">
                <SidebarOpen />
              </div>
            )}
          </button>
        </div>
        <div className="p-4 flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-purple-200 flex items-center justify-center">
            <img
              src="/default.jpg"
              alt="User"
              className="w-full h-full rounded-full"
            />
          </div>
          {!isCollapsed && (
            <div>
              <h2 className="font-semibold text-gray-800">{user?.username}</h2>
              <p className="text-sm text-gray-500">{user?.email}</p>
            </div>
          )}
        </div>
        <br />
        <ul className="space-y-2">
          <li>
            <a
              href="#"
              className="flex items-center gap-4 p-2 text-gray-700 hover:bg-gray-200 rounded-lg mx-4"
            >
              <span className="material-icons-outlined">
                <House />
              </span>
              {!isCollapsed && <span>Dashboard</span>}
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center gap-4 p-2 text-gray-700 hover:bg-gray-200 rounded-lg mx-4"
            >
              <span className="material-icons-outlined">
                <ChartArea size={28} />
              </span>
              {!isCollapsed && <span>Budget</span>}
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center gap-4 p-2 text-gray-700 hover:bg-gray-200 rounded-lg mx-4"
            >
              <span className="material-icons-outlined">
                <Bell size={28} />
              </span>
              {!isCollapsed && <span>Notification</span>}
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center gap-4 p-2 text-gray-700 hover:bg-gray-200 rounded-lg mx-4"
            >
              <span className="material-icons-outlined">
                <HandCoins size={32} />
              </span>
              {!isCollapsed && <span>Expenses</span>}
            </a>
          </li>
          <li>
            <a
              href="#"
              className="flex items-center gap-4 p-2 text-gray-700 hover:bg-gray-200 rounded-lg mx-4"
            >
              <span className="material-icons-outlined">
                {" "}
                <Pocket size={32} />
              </span>
              {!isCollapsed && <span>Inventory</span>}
            </a>
          </li>
        </ul>
      </div>
      <div className="p-4 flex space-y-2">
        <div className="flex items-center justify-between px-2"> logo</div>
        <div className="flex items-center justify-between px-2"> logo</div>
      </div>
    </aside>
  );
};

export default ProductSidebar;

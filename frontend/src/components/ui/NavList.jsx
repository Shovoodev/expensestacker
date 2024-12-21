import React from "react";
import { NavLink } from "react-router";

const NavList = ({ header, children, openSidebar, address }) => {
  return (
    <li>
      {openSidebar ? (
        <NavLink
          to={address}
          className="flex items-center p-2 mt-7 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group"
        >
          {children}
          <span className="flex-1 hover:scale-110 hover:text-white text-black ms-3 whitespace-nowrap">
            {header}
          </span>
        </NavLink>
      ) : (
        <>
          <li
            className={`flex items-center p-2 mt-7 text-gray-900 rounded-lg hover:scale-110 hover:text-white dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group }`}
          >
            {children}
          </li>
        </>
      )}
    </li>
  );
};

export default NavList;

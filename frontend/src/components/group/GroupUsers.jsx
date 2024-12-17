import React from "react";
import { useUser } from "../hook/use-user";
import { NavLink } from "react-router";

const GroupUsers = ({client}) => {
  const {user} = useUser()
  return (
    <div className="block max-w-[18rem] rounded-lg bg-white text-left text-surface shadow-secondary-1 dark:bg-surface-dark dark:text-white">
      <div className="p-6">
        <h6 className="mb-2 font-bold text-xl leading-tight text-surface/75 dark:text-neutral-300">
         {client}
        </h6>
        <NavLink
          className="pointer-events-auto me-5 inline-block cursor-pointer rounded text-base font-normal leading-normal text-primary transition duration-150 ease-in-out hover:text-primary-600 focus:text-primary-600 focus:outline-none focus:ring-0 active:text-primary-700 dark:text-primary-400"
        >
          Profile
        </NavLink>
        <NavLink
          className="pointer-events-auto inline-block cursor-pointer rounded text-base font-normal leading-normal text-primary transition duration-150 ease-in-out hover:text-primary-600 focus:text-primary-600 focus:outline-none focus:ring-0 active:text-primary-700 dark:text-primary-400"
        >
          Expenses
        </NavLink>
      </div>
    </div>
  );
};

export default GroupUsers;

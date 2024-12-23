import React, { useState } from "react";
import { NavLink } from "react-router";
import { Menu, MenuButton, MenuItems } from "@headlessui/react";
import { useGroup } from "../../hook/use-group";

const Profiles = ({ user }) => {
  const [loading, setLoading] = useState(false);
  const { allGroups, setAllGroups } = useGroup();
  const getUserGroups = async (group) => {
    const groupId = group._id;
    const userId = user._id;
    if (groupId && userId) {
      const user = await fetch(
        `http://localhost:3333/${userId}/${groupId}/update`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      ).then((data) => console.log({ data }));
    }
  };
  return (
    <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow ">
      <div className="flex justify-end px-4 pt-4"></div>
      <div className="flex flex-col items-center pb-10">
        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-black">
          {user.username}
        </h5>
        <div className="flex mt-4 md:mt-6">
          <Menu>
            <MenuButton className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 ">
              Add In Group
            </MenuButton>
            <MenuItems
              anchor="bottom"
              className=" p-2 bg-gray-800 rounded-lg text-white text-lg"
            >
              {loading ? (
                <p>Loading...</p>
              ) : allGroups && allGroups.length > 0 ? (
                allGroups.map((group, idx) => {
                  return (
                    <button
                      onClick={() => getUserGroups(group)}
                      className="flex p-2 items-center text-center "
                      key={idx}
                    >
                      {group.name}
                    </button>
                  );
                })
              ) : (
                <p>No groups found.</p>
              )}
            </MenuItems>
          </Menu>
          <NavLink
            href="#"
            className="py-2 px-4 ms-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10  dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            Profile
          </NavLink>
          <NavLink
            href="#"
            className="py-2 px-4 ms-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10  dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            Expenses
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Profiles;

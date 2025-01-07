import {
  ClipboardList,
  AlignStartVertical,
  Calendar,
  Search,
  MoveLeft,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { NavLink } from "react-router-dom"; // Corrected import

const ProductNavbar = ({ groupId }) => {
  const [expenseList, setExpenseList] = useState();
  const [memberList, setMemberList] = useState();
  const getAllGroupUser = async () => {
    try {
      if (groupId) {
        await fetch(`http://localhost:3333/${groupId}/members`, {
          credentials: "include",
        })
          .then((res) => res.json())
          .then((data) => {
            setMemberList(data);
          });
      }
    } catch (error) {
      console.error(error);
    }
  };
  const listOfExpenses = async () => {
    try {
      const response = await fetch(
        `http://localhost:3333/group/${groupId}/expenses`,
        {
          credentials: "include",
        }
      );
      const data = await response.json();
      setExpenseList(data);
    } catch (error) {
      console.error("Failed to fetch expense list:", error);
    }
  };

  useEffect(() => {
    listOfExpenses();
    getAllGroupUser();
  }, []);

  return (
    <div className="flex flex-col md:flex-row items-center gap-4 p-4 bg-gray-100 border-b shadow-md">
      <div className="flex items-center">
        <NavLink
          to={`/group/${groupId}/expenses`}
          className="flex items-center gap-2 p-2 text-lg font-bold text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-700 hover:text-white transition"
        >
          <MoveLeft />
          <span>Back</span>
        </NavLink>
      </div>

      <header className="w-full md:w-auto flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-gray-700 font-medium">Sort by:</span>

          <Menu>
            <MenuButton className="flex items-center gap-2 px-3 py-2 bg-gray-200 rounded-lg hover:bg-gray-700 hover:text-white transition">
              <ClipboardList size={24} />
              <span>Member</span>
            </MenuButton>
            <MenuItems
              anchor="bottom"
              className="absolute mt-2 bg-white shadow-lg rounded-md w-64 max-h-64 overflow-y-auto"
            >
              {memberList ? (
                memberList.map(({ _id, username }) => {
                  const expenseId = _id;
                  return (
                    <NavLink
                      key={_id}
                      to={`/${groupId}/expense/${expenseId}/products`}
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-700 hover:text-white rounded transition"
                    >
                      {username}
                    </NavLink>
                  );
                })
              ) : (
                <p className="px-4 py-2 text-gray-500">No Expenses Available</p>
              )}
            </MenuItems>
          </Menu>
        </div>

        <Menu>
          <MenuButton className="flex items-center gap-2 px-3 py-2 bg-gray-200 rounded-lg hover:bg-gray-700 hover:text-white transition">
            <AlignStartVertical size={24} />
            <span>Expense List</span>
          </MenuButton>
          <MenuItems
            anchor="bottom"
            className="absolute mt-2 bg-white shadow-lg rounded-md w-64 max-h-64 overflow-y-auto"
          >
            {expenseList ? (
              expenseList.map(({ _id, expensename }) => {
                const expenseId = _id;
                return (
                  <NavLink
                    key={_id}
                    to={`/${groupId}/expense/${expenseId}/products`}
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-700 hover:text-white rounded transition"
                  >
                    {expensename}
                  </NavLink>
                );
              })
            ) : (
              <p className="px-4 py-2 text-gray-500">No Expenses Available</p>
            )}
          </MenuItems>
        </Menu>

        <Menu>
          <MenuButton className="flex items-center gap-2 px-3 py-2 bg-gray-200 rounded-lg hover:bg-gray-700 hover:text-white transition">
            <Calendar size={24} />
            <span>Calendar</span>
          </MenuButton>
          <MenuItems
            anchor="bottom"
            className="absolute mt-2 bg-white shadow-lg rounded-md w-48"
          >
            <MenuItem>
              <button className="w-full px-4 py-2 text-left hover:bg-gray-100">
                // to do
              </button>
            </MenuItem>
          </MenuItems>
        </Menu>
      </header>
    </div>
  );
};

export default ProductNavbar;

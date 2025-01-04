import {
  ClipboardList,
  AlignStartVertical,
  Calendar,
  Search,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { NavLink } from "react-router";
const ProductNavbar = ({ groupId }) => {
  const [expenseList, setExpenseList] = useState();
  const listOfExpenses = async () => {
    await fetch(`http://localhost:3333/group/${groupId}/expenses`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setExpenseList(data);
      });
  };
  useEffect(() => {}, [listOfExpenses]);

  return (
    <div>
      <header className=" flex justify-between p-4 border">
        <div className="flex gap-3">
          <div className="flex items-center p-2 hover:rounded-lg ">Sort by</div>
          <Menu>
            <MenuButton>
              <button className="flex items-center p-2 hover:rounded-lg  hover:bg-gray-700 hover:text-white">
                <ClipboardList size={32} /> <span> Member</span>
              </button>
            </MenuButton>
            <MenuItems anchor="bottom">
              <MenuItem>
                <button className="block w-full text-left data-[focus]:bg-blue-100">
                  Settings
                </button>
              </MenuItem>
            </MenuItems>
          </Menu>
          <Menu>
            <MenuButton>
              <button
                onClick={listOfExpenses}
                className="flex items-center p-2 hover:rounded-lg  hover:bg-gray-700 hover:text-white"
              >
                <AlignStartVertical size={32} /> <span> Expense List</span>
              </button>
            </MenuButton>
            <MenuItems anchor="bottom">
              {expenseList ? (
                expenseList?.map(({ _id, expensename }) => {
                  const expenseId = _id;
                  return (
                    <button
                      className=" rounded-lg shadow-lg uppercase w-full px-4 text-xl font-bold p-3 bg-gray-100 hover:bg-gray-900 hover:text-white"
                      key={_id}
                    >
                      <NavLink to={`/${groupId}/expense/${expenseId}/products`}>
                        {expensename}
                      </NavLink>
                    </button>
                  );
                })
              ) : (
                <p className="gap-4">NO Other Expenses </p>
              )}
            </MenuItems>
          </Menu>
          <Menu>
            <MenuButton>
              <button className="flex items-center p-2 hover:rounded-lg  hover:bg-gray-700 hover:text-white">
                <Calendar size={32} /> <span> Calender</span>
              </button>
            </MenuButton>
            <MenuItems anchor="bottom">
              <MenuItem>
                <button className="block w-full text-left data-[focus]:bg-blue-100">
                  Settings
                </button>
              </MenuItem>
            </MenuItems>
          </Menu>
        </div>
        <div className="flex items-center gap-2">
          <input className="border rounded p-1 " alt="Search"></input>
          <Search size={22} />
        </div>
      </header>
    </div>
  );
};

export default ProductNavbar;

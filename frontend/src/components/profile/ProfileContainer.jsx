import React, { useEffect, useState } from "react";

import { useGroup } from "./../hook/use-group";
import GroupCards from "./GroupCards";
import ExpenseDetailsByUser from "./ExpenseDetailsByUser";
const ProfileContainer = () => {
  const { allGroups, setAllGroups } = useGroup();
  const [expenseDetails, setExpenseDetails] = useState();
  const getAllExpenses = async () => {
    await fetch(`http://localhost:3333/${groupId}/totalcostofproducts`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setExpenseDetails(data);
      });
  };
  useEffect(() => {
    getAllExpenses();
  }, []);
  return (
    <>
      <div className="max-w-6xl mx-auto p-6">
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {allGroups ? (
            allGroups.map((group) => {
              if (group === null) return;
              return (
                <GroupCards
                  created_at={group.created_at}
                  isActive={group.isActive}
                  key={group._id}
                  groupId={group._id}
                  groupName={group.name}
                ></GroupCards>
              );
            })
          ) : (
            <>
              <div
                aria-label="Loading..."
                role="status"
                class="flex items-center space-x-2"
              >
                <svg
                  class="h-20 w-20 animate-spin stroke-gray-500"
                  viewBox="0 0 256 256"
                >
                  <line
                    x1="128"
                    y1="32"
                    x2="128"
                    y2="64"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="24"
                  ></line>
                  <line
                    x1="195.9"
                    y1="60.1"
                    x2="173.3"
                    y2="82.7"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="24"
                  ></line>
                  <line
                    x1="224"
                    y1="128"
                    x2="192"
                    y2="128"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="24"
                  ></line>
                  <line
                    x1="195.9"
                    y1="195.9"
                    x2="173.3"
                    y2="173.3"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="24"
                  ></line>
                  <line
                    x1="128"
                    y1="224"
                    x2="128"
                    y2="192"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="24"
                  ></line>
                  <line
                    x1="60.1"
                    y1="195.9"
                    x2="82.7"
                    y2="173.3"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="24"
                  ></line>
                  <line
                    x1="32"
                    y1="128"
                    x2="64"
                    y2="128"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="24"
                  ></line>
                  <line
                    x1="60.1"
                    y1="60.1"
                    x2="82.7"
                    y2="82.7"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="24"
                  ></line>
                </svg>
                <span class="text-4xl flex items-center justify-center text-gray-500">
                  Loading...
                </span>
              </div>
            </>
          )}
        </div>
        <div className=" felx items-center justify-center p-4">
          List of last expenses on your group
        </div>
        <table className="min-w-full divide-y rounded-lg divide-gray-200 dark:divide-neutral-700">
          <thead>
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-start text-black text-xs font-medium  uppercase dark:text-neutral-500"
              >
                <p className="block font-sans text-sm antialiased font-normal leading-none ">
                  Expense
                </p>
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-start text-black text-xs font-medium  uppercase dark:text-neutral-500"
              >
                <p className="block font-sans text-sm antialiased font-normal leading-none ">
                  Done By
                </p>
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-start text-black text-xs font-medium  uppercase dark:text-neutral-500"
              >
                {" "}
                <p className="block font-sans text-sm antialiased font-normal leading-none ">
                  Total
                </p>
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-start text-black text-xs font-medium  uppercase dark:text-neutral-500"
              >
                {" "}
                <p className="block font-sans text-sm antialiased font-normal leading-none">
                  Date
                </p>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
            {allGroups ? (
              allGroups.map((group) => {
                console.log({ group });

                if (group === null) return;
                return <ExpenseDetailsByUser groupId={group._id} />;
              })
            ) : (
              <>
                <div
                  aria-label="Loading..."
                  role="status"
                  class="flex items-center space-x-2"
                >
                  <svg
                    class="h-20 w-20 animate-spin stroke-gray-500"
                    viewBox="0 0 256 256"
                  >
                    <line
                      x1="128"
                      y1="32"
                      x2="128"
                      y2="64"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="24"
                    ></line>
                    <line
                      x1="195.9"
                      y1="60.1"
                      x2="173.3"
                      y2="82.7"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="24"
                    ></line>
                    <line
                      x1="224"
                      y1="128"
                      x2="192"
                      y2="128"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="24"
                    ></line>
                    <line
                      x1="195.9"
                      y1="195.9"
                      x2="173.3"
                      y2="173.3"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="24"
                    ></line>
                    <line
                      x1="128"
                      y1="224"
                      x2="128"
                      y2="192"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="24"
                    ></line>
                    <line
                      x1="60.1"
                      y1="195.9"
                      x2="82.7"
                      y2="173.3"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="24"
                    ></line>
                    <line
                      x1="32"
                      y1="128"
                      x2="64"
                      y2="128"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="24"
                    ></line>
                    <line
                      x1="60.1"
                      y1="60.1"
                      x2="82.7"
                      y2="82.7"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="24"
                    ></line>
                  </svg>
                  <span class="text-4xl flex items-center justify-center text-gray-500">
                    Loading...
                  </span>
                </div>
              </>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ProfileContainer;

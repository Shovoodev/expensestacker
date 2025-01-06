import React, { useEffect, useState } from "react";
import UserTotalExpensesDetail from "./UserTotalExpensesDetail";

const UserTotalExpenses = ({ groupId }) => {
  const [userDetail, setUserDetail] = useState();
  const getAllGroupUser = async () => {
    try {
      if (groupId) {
        await fetch(`http://localhost:3333/${groupId}/members`, {
          credentials: "include",
        })
          .then((res) => res.json())
          .then((data) => {
            setUserDetail(data);
          });
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getAllGroupUser();
  }, []);
  return (
    <table className="min-w-full mb-7 rounded-lg overflow-hidden dark:border-neutral-700 divide-y border divide-gray-200 dark:divide-neutral-700">
      <thead>
        <tr>
          <th
            scope="col"
            className="px-6 py-3 text-start text-black text-xs font-medium  uppercase dark:text-neutral-500"
          >
            <p className="block font-sans text-sm antialiased font-normal leading-none ">
              User
            </p>
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-start text-black text-xs font-medium  uppercase dark:text-neutral-500"
          >
            <p className="block font-sans text-sm antialiased font-normal leading-none ">
              Number Of Expenses
            </p>
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-start text-black text-xs font-medium  uppercase dark:text-neutral-500"
          >
            <p className="block font-sans text-sm antialiased font-normal leading-none ">
              Total Spend
            </p>
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
        {userDetail ? (
          userDetail?.map((data) => {
            return <UserTotalExpensesDetail user={data?.username} />;
          })
        ) : (
          <p className="gap-4">This group is empty </p>
        )}
      </tbody>
    </table>
  );
};

export default UserTotalExpenses;

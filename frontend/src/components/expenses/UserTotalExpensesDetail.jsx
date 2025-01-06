import React from "react";

const UserTotalExpensesDetail = ({ user, TotalExpense }) => {
  return (
    <>
      <tr>
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 ">
          {user}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 ">
          {TotalExpense}
        </td>
      </tr>
    </>
  );
};

export default UserTotalExpensesDetail;

import React, { useEffect, useState } from "react";

import FormatDate from "./../Helper";
const ExpenseDetailsByUser = ({ groupId }) => {
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
      {expenseDetails ? (
        expenseDetails?.map(
          ({ _id, totalCost, expensename, createdTime, done_By }) => {
            const dated = FormatDate(createdTime);
            return (
              <tr key={_id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 ">
                  {expensename}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 ">
                  {done_By}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 ">
                  {" "}
                  {totalCost} €
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 ">
                  {dated}
                </td>
              </tr>
            );
          }
        )
      ) : (
        <p className="gap-4">NO Other Expenses </p>
      )}
    </>
  );
};

export default ExpenseDetailsByUser;

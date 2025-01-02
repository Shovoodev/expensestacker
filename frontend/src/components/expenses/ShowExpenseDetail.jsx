import React, { useState, useEffect } from "react";
import ExpenseDetailList from "./ExpenseDetailList";

const ShowExpenseDetail = ({ groupId }) => {
  return (
    <table className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700">
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
        <ExpenseDetailList />
      </tbody>
    </table>
  );
};

export default ShowExpenseDetail;

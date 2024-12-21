import { MoveRight } from "lucide-react";
import React from "react";
import { NavLink } from "react-router";

const ExpenseButton = ({
  expenseId,
  expensename,
  className,
  type = "button",
  onClick,
}) => {
  return (
    <>
      <NavLink
        className=" gap-3 inline-block"
        to={`/expense/${expenseId}/products`}
      >
        <button
          onClick={onClick}
          type={type}
          className={
            "inline-flex items-center px-4 py-5 text-sm font-medium text-center text-white bg-gray-700 rounded-lg hover:bg-gray-800  uppercase " +
            className
          }
        >
          {expensename}
          <MoveRight/>
        </button>
      </NavLink>
    </>
  );
};

export default ExpenseButton;

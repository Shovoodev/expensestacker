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
      <button
        onClick={onClick}
        type={type}
        className={
          "inline-block rounded-full border-2 border-primary px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-primary transition duration-150 ease-in-out hover:border-primary-accent-300  hover:text-primary-accent-300 focus:border-primary-600 focus:bg-primary-50/50 focus:text-primary-600 focus:outline-none focus:ring-0 active:border-primary-700 active:text-primary-700 motion-reduce:transition-none hover:bg-gray-600 hover:text-white dark:text-primary-500 dark:hover:bg-blue-950 dark:focus:bg-blue-950 " +
          className
        }
      >
        <NavLink to={`/expense/${expenseId}/products`}>
          {expensename}
        </NavLink>
      </button>
    </>
  );
};

export default ExpenseButton;

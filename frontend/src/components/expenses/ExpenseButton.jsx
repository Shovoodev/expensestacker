import { MoveRight } from "lucide-react";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router";
import FormatDate from "../Helper";
const ExpenseButton = ({
  groupId,
  created_at,
  expenseId,
  expensename,
  done_By,
  className,
  type = "button",
  onClick,
}) => {
  const [userName, setUserName] = useState(null);
  const viewDate = FormatDate(created_at);
  useEffect(() => {
    const fetchUserName = async () => {
      try {
        const response = await fetch(`http://localhost:3333/${done_By}/user`);
        if (!response.ok) {
          throw new Error("Failed to fetch user");
        }
        const user = await response.json();
        setUserName(user?.username);
      } catch (error) {
        console.error("Error fetching user name:", error);
        setUserName("Unknown");
      }
    };

    if (done_By) {
      fetchUserName();
    }
  }, [done_By]);

  return (
    <>
      <div className="flex justify-center items-center">
        <div className=" h-30 w-30 bg-gray-200 rounded shadow-lg">
          <div className=" items-center gap-5 justify-between  flex mt-4">
            <h1 className="ml-5">{expensename}</h1>
            <NavLink
              className=" gap-3 inline-block"
              to={`/${groupId}/expense/${expenseId}/products`}
            >
              <button
                onClick={onClick}
                type={type}
                className={
                  "inline-flex items-center px-4 py-5 text-sm font-medium text-center text-white bg-gray-700 rounded-lg hover:bg-gray-800  uppercase " +
                  className
                }
              >
                <MoveRight />
              </button>
            </NavLink>
          </div>
          <div className="flex p-2">
            <div className="">
              <p>Done By : {userName ? userName : null}</p>
              <p>data : {viewDate} </p>
            </div>
            <div></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExpenseButton;

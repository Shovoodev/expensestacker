import React, { useEffect, useState } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import GeneralNavbar from "../main/GeneralNavbar";
import ExpenseButton from "./ExpenseButton";
import { useParams } from "react-router";


const Expenses = () => {
  const [newExpense, setNewExpense] = useState({ expensename: "" });
  const [printAllExpenses, setPrintAllExpenses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { groupId } = useParams();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(`http://localhost:3333/group/${groupId}/expense/register`, {
      credentials : "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newExpense),
    })
      .then(() => allExpensesOnGroup())
      .catch((error) => console.error(error));
  };

  const allExpensesOnGroup = async () => {
    setLoading(true);
    await fetch(`http://localhost:3333/group/${groupId}/expenses`)
      .then((res) => res.json())
      .then((data) => {
        setPrintAllExpenses(data);
      })
      .finally(() => setLoading(false));
  };
  useEffect(() => {
    allExpensesOnGroup();
  }, []);

  return (
    <>
      <GeneralNavbar fieldHeader="All expenses" className=" text-2xl" />
      <div className="flex justify-between">
        <div>
          {
          loading ? (
            <p>Loading...</p>
          ) : 
          printAllExpenses && printAllExpenses.length > 0 ? (
            printAllExpenses.map(({ _id, expensename }) => {
              return (
                <ExpenseButton
                 groupId={groupId}
                 expenseId={_id}
                  key={_id}
                  expensename={expensename}
                ></ExpenseButton>
              );
            })
          ) 
          : (
            <p>No expense found.</p>
          )
          }
        </div>
        <div>
          <button
            className="text-white bg-red-700 uppercase hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700  dark:red:ring-green-800"
          >
            Delete Group
          </button>
        </div>
      </div>
      <button
        className="flex justify-center mt-6 px-4 py-2 mb-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
        onClick={() => setIsModalOpen(!isModalOpen)}
      >
        {!isModalOpen ? <p> Add New Expenses</p> : <p> Minimize </p>}
      </button>
      {isModalOpen && (
        <div className="ml-8 bg-gray-100 flex w-80 flex-col mb-3 items-center justify-center">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-2 w-[280px] md:flex md:justify-center mb-6 pt-4"
          >
            <Input
              label="Your Expense Name"
              onChange={(e) =>
                setNewExpense({ ...newExpense, expensename: e.target.value })
              }
            />
            <Button type="submit">ADD Expense</Button>
          </form>
        </div>
      )}
    </>
  );
};

export default Expenses;

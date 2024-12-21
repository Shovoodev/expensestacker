import React, { useEffect, useState } from "react";
import Input from "../ui/Input";
import ExpenseButton from "./ExpenseButton";
import { Trash2 } from "lucide-react";
import GeneralNavbar from "../main/GeneralNavbar";
import { NavLink, useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import { useUser } from "../hook/use-user";
import Sidebar from "../main/Sidebar";
import UserGroup from "./UserGroup";

const Expenses = () => {
  const [newExpense, setNewExpense] = useState({ expensename: "" });
  const [printAllExpenses, setPrintAllExpenses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useUser();
  const [groupUser, setGroupUser] = useState([]);
  const { groupId } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch(`http://localhost:3333/group/${groupId}/expense/register`, {
        credentials: "include",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newExpense),
      }).then(() => {
        allExpensesOnGroup();
        setIsModalOpen(false);
      });
    } catch (error) {
      console.error(error);
    }
  };

  const deleteCurrentGroup = async () => {
    try {
      await fetch(`http://localhost:3333/group/delete/${groupId}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });
      navigate(`/groups`);
    } catch (error) {
      console.error(error);
    }
  };

  const allExpensesOnGroup = async () => {
    setLoading(true);
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
  const getAllGroupUser = async () => {
    try {
      if (groupId) {
        await fetch(`http://localhost:3333/${groupId}/members`, {
          credentials: "include",
        })
          .then((res) => res.json())
          .then((data) => {
            console.log({ data });

            setGroupUser(data);
          });
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllGroupUser();
  }, [groupId]);

  return (
    <>
      <GeneralNavbar />
      <div className="flex relative">
        <div>
          <Sidebar />
        </div>
        <div className="flex-1 p-5">
          <div className="flex justify-between items-start">
            <div className="flex flex-wrap gap-3">
              {loading ? (
                <p>Loading...</p>
              ) : printAllExpenses.length > 0 ? (
                printAllExpenses.map(({ _id, expensename }) => (
                  <ExpenseButton
                    groupId={groupId}
                    expenseId={_id}
                    key={_id}
                    expensename={expensename}
                  />
                ))
              ) : (
                <p>No expense found.</p>
              )}
              <button
                className="rounded-full shadow-lg text-sm border-2 border-primary px-6 py-2 hover:text-white hover:bg-gray-800 font-medium uppercase transition"
                onClick={() => setIsModalOpen(!isModalOpen)}
              >
                {!isModalOpen ? "Add Expenses" : "Minimize"}
              </button>
            </div>
            {isModalOpen && (
              <div className="absolute top-[20%] left-[50%] transform -translate-x-1/2 bg-gray-100 flex w-[90%] lg:w-[50%] flex-col items-center justify-center max-w-lg rounded-lg shadow-lg p-6">
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-4 w-full max-w-xs"
                >
                  <Input
                    label="Your Expense Name"
                    onChange={(e) =>
                      setNewExpense({
                        ...newExpense,
                        expensename: e.target.value,
                      })
                    }
                  />
                  <button
                    className="w-full bg-gray-600 hover:bg-gray-700 text-white py-2 rounded-lg transition"
                    type="submit"
                  >
                    Add Expense
                  </button>
                </form>
              </div>
            )}
          </div>
          <div>
            <h1 className=" p-4 text-xl"> Members on this Group </h1>

            {loading ? (
              <p>Loading...</p>
            ) : groupUser && groupUser.length > 0 ? (
              groupUser.map(({ _id, username }) => {
                return <UserGroup username={username} key={_id}></UserGroup>;
              })
            ) : (
              <p className=" text-center text-xl">No Members in this Group</p>
            )}
          </div>
        </div>
        <button
          onClick={deleteCurrentGroup}
          className="absolute flex items-center px-6 py-2 top-5 right-5 text-white hover:bg-red-700 bg-black font-medium rounded-full text-sm p-3"
        >
          <Trash2 size={36} strokeWidth={2.25} />
          <span className="ml-4">Delete Group</span>
        </button>{" "}
      </div>
    </>
  );
};

export default Expenses;

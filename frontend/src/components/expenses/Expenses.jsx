import React, { useEffect, useState } from "react";
import Input from "../ui/Input";
import ExpenseButton from "./ExpenseButton";
import { Trash2 } from "lucide-react";
import GeneralNavbar from "../main/GeneralNavbar";
import { NavLink, useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import Sidebar from "../main/Sidebar";
import UserGroup from "./UserGroup";
import ShowExpenseDetail from "./ShowExpenseDetail";

const Expenses = () => {
  const [newExpense, setNewExpense] = useState({ expensename: "" });
  const [printAllExpenses, setPrintAllExpenses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
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
            setGroupUser(data);
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
    <>
      <GeneralNavbar />
      <div className="flex  justify-between">
        <div className="flex">
          <div>
            <Sidebar />
          </div>
          <div className="flex p-5">
            <div className="flex-col justify-between items-start">
              <div className="flex flex-wrap gap-3">
                {loading ? (
                  <p>Loading...</p>
                ) : printAllExpenses.length > 0 ? (
                  printAllExpenses.map(({ _id, expensename, created_at }) => (
                    <ExpenseButton
                      groupId={groupId}
                      expenseId={_id}
                      key={_id}
                      created_at={created_at}
                      expensename={expensename}
                    />
                  ))
                ) : (
                  <p>No expense found.</p>
                )}
                <div>
                  <button
                    className="rounded-full shadow-lg text-sm border-2 border-primary px-6 py-2 hover:text-white hover:bg-gray-800 font-medium uppercase transition"
                    onClick={() => setIsModalOpen(!isModalOpen)}
                  >
                    {!isModalOpen ? "Add Expenses" : "Minimize"}
                  </button>
                </div>
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
              <div className="flex-col mt-6  rounded">
                <div className=" flex gap-4 p-1">
                  <div>Sort By Member : </div>
                  {groupUser.length > 0 && groupUser ? (
                    groupUser?.map(({ _id, username }) => {
                      return (
                        <button
                          className=" bg-gray-600 text-white rounded-md text-whitetext-xs font-medium me-2 px-2.5 py-0.5 "
                          key={_id}
                        >
                          <NavLink>{username}</NavLink>
                        </button>
                      );
                    })
                  ) : (
                    <p className="gap-4">This group is empty </p>
                  )}
                </div>
                <div className=" mb-7 border rounded-lg overflow-hidden dark:border-neutral-700">
                  <ShowExpenseDetail groupId={groupId} />
                </div>
                <div className=" mb-7 flex justify-between border rounded-lg overflow-hidden dark:border-neutral-700">
                  <table>
                    <tbody className="divide-y divide-gray-200 dark:divide-neutral-700">
                      <tr>
                        <td
                          colSpan={3}
                          className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800"
                        >
                          total cost in this month :
                        </td>
                        <td
                          colSpan={1}
                          className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800"
                        >
                          10000 euro
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div>
            <button
              onClick={deleteCurrentGroup}
              className="flex  items-center mt-4justify-between text-white hover:bg-red-700 bg-black font-medium rounded-full text-sm p-3"
            >
              <Trash2 size={36} strokeWidth={2.25} />
              <span className="hidden md:inline ml-2">Delete Group</span>
            </button>
            <div className=" flex justify-end ">
              <div className=" grid grid-cols-1 gap-2">
                <h1 className=" p-4 text-xl "> Members on this Group </h1>
                {groupUser.length > 0 && groupUser ? (
                  groupUser?.map(({ _id, username }) => {
                    return <UserGroup username={username} key={_id} />;
                  })
                ) : (
                  <p className="gap-4">This group is empty </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Expenses;

import React, { useEffect, useState } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import GeneralNavbar from "../main/GeneralNavbar";
import ExpenseButton from "./ExpenseButton";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import GroupUsers from "../group/GroupUsers";
import { useUser } from "../hook/use-user";

const Expenses = () => {
  const [newExpense, setNewExpense] = useState({ expensename: "" });
  const [printAllExpenses, setPrintAllExpenses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()
  const {user} = useUser()
  const [groupUser , setGroupoUser] = useState("")
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

  
  const deleteCurrentGroup= async() => {
    const pro = groupId
    await fetch(`http://localhost:3333/group/delete/`+ pro,{
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(()=>navigate(`/groups`))
      .catch((error) => {
        console.error(error);
      })
  }
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
      <GeneralNavbar fieldHeader="Showing expense on Group"  className=" text-2xl" />
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
          onClick={deleteCurrentGroup}
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
      
      <div className='text-black w-full flex h-full ' >
        
  <div className=' fixed right-[100px]  w-[300px]  border ' >
  <h5 className="mb-1 p-2 text-center text-xl font-medium leading-tight ">
          Group Members
        </h5>
        {loading ? (
          <p>Loading...</p>
        ) : groupUser && groupUser.length > 0 ? (
          groupUser.map(({ _id, username }) => {
            return <GroupUsers client={user?.username} key={_id}> {username} </GroupUsers>;
          })
        ) : (
          <p className=" text-center text-xl">No Members in this Group </p>
        )}
  </div>
</div>
    </>
  );
};

export default Expenses;

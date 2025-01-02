import { NavLink } from "react-router";
import { useUser } from "../hook/use-user";
import GeneralNavbar from "./GeneralNavbar";
import UserSidebar from "../members/main/UserSidebar";
import { X } from "lucide-react";
import Sidebar from "./Sidebar";
import { MoveRight } from "lucide-react";
import NewlyAddedExpenses from "./updates/NewlyAddedExpenses";
import { useEffect, useState } from "react";
const User = () => {
  const { user } = useUser();
  const [deptExpenses, setDeptExpenses] = useState();
  const gettingAllExpeses = async () => {
    fetch(`http://localhost:3333/allexpenses`)
      .then((res) => res.json())
      .then((data) => {
        console.log({ data });

        setDeptExpenses(data);
      });
  };
  useEffect(() => {
    gettingAllExpeses();
  }, []);
  return (
    <>
      <GeneralNavbar client={user?.username} />
      <br />
      <div className="flex">
        <Sidebar />
        <div className="mb-6 grid grid-cols-2 pt-16 pl-10 h-10 w-full ">
          <div className="max-w-sm p-6 w-52 text-black border-gray-200 rounded-lg shadow ">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
              Registrated Groups
            </h5>

            <NavLink
              to="/groups"
              className="inline-flex items-center px-4 py-5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              GROUPS
              <div className="">
                <MoveRight />
              </div>
            </NavLink>
          </div>

          <div className="max-w-sm  w-52 p-6 bg-white border-gray-200 rounded-lg shadow ">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
              Registrated Members
            </h5>

            <NavLink
              to="/users"
              className="inline-flex items-center px-4 py-5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              MEMBERS
              <MoveRight />
            </NavLink>
          </div>
        </div>
        <div className=" h-screen bg-gray-100 p-3 gap-3 rounded-lg shadow-md">
          <div className=" flex justify-between">
            <div>Newly added Expenses</div>
            <X size={20} />
          </div>
          {deptExpenses ? (
            deptExpenses?.map(({ _id, expensename, created_at }) => {
              const formatDate = (isoDate) => {
                const date = new Date(isoDate);
                return date.toISOString().split("T")[0];
              };

              return (
                <NewlyAddedExpenses
                  key={_id}
                  expensename={expensename}
                  created_at={formatDate(created_at)}
                />
              );
            })
          ) : (
            <p className="gap-4">This group is empty </p>
          )}
        </div>
      </div>
    </>
  );
};

export default User;

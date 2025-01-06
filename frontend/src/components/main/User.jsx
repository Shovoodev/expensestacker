import { NavLink } from "react-router";
import { useUser } from "../hook/use-user";
import GeneralNavbar from "./GeneralNavbar";
import Sidebar from "./Sidebar";
import { MoveRight, X } from "lucide-react";
import NewlyAddedExpenses from "./updates/NewlyAddedExpenses";
import { useEffect, useState } from "react";

const User = () => {
  const { user } = useUser();
  const [deptExpenses, setDeptExpenses] = useState();

  const gettingAllExpenses = async () => {
    fetch(`http://localhost:3333/allexpenses`)
      .then((res) => res.json())
      .then((data) => {
        setDeptExpenses(data);
      });
  };

  useEffect(() => {
    gettingAllExpenses();
  }, []);

  return (
    <>
      <GeneralNavbar client={user?.username} />
      <div className="flex flex-col md:flex-row mt-6">
        <Sidebar />
        <div className="flex-1 px-4 md:px-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
            <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <h5 className="mb-4 text-xl font-semibold text-gray-900">
                Registered Groups
              </h5>
              <NavLink
                to="/groups"
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gray-600 rounded-lg hover:bg-gray-800 transition duration-300"
              >
                GROUPS
                <MoveRight className="ml-2" />
              </NavLink>
            </div>

            <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <h5 className="mb-4 text-xl font-semibold text-gray-900">
                Registered Members
              </h5>
              <NavLink
                to="/users"
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-gray-600 rounded-lg hover:bg-gray-800 transition duration-300"
              >
                MEMBERS
                <MoveRight className="ml-2" />
              </NavLink>
            </div>
          </div>

          <div className="p-6 bg-white rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Newly Added Expenses
              </h3>
              <X
                size={20}
                className="cursor-pointer text-gray-500 hover:text-gray-700"
              />
            </div>
            <div className="flex  ">
              {deptExpenses && deptExpenses.length > 0 ? (
                deptExpenses
                  .slice(-4)
                  .reverse()
                  .map(({ _id, expensename, created_at, group_id }) => {
                    const formatDate = (isoDate) => {
                      const date = new Date(isoDate);
                      return date.toISOString().split("T")[0];
                    };

                    return (
                      <NewlyAddedExpenses
                        key={_id}
                        group_id={group_id}
                        expensename={expensename}
                        created_at={formatDate(created_at)}
                      />
                    );
                  })
              ) : (
                <p className="text-gray-600">This group is empty</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default User;

import { NavLink } from "react-router";
import { useUser } from "../hook/use-user";
import GeneralNavbar from "./GeneralNavbar";

const User = () => {
  const { user } = useUser();
  return (
    <>
      <GeneralNavbar client={user?.username} />
      <div className="mb-6 grid grid-cols-3 w-full ">
        <div className="me-4 block rounded-lg bg-white shadow-secondary-1 dark:bg-surface-dark dark:text-white text-surface">
          <div className="p-6 flex-col items-center justify-center">
            <h5 className="mb-2 text-xl font-medium leading-tight">
              Examine your All groups Hear
            </h5>
            <button className="flex ml-[5%] items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded hover:scale-110 hover:text-white hover:bg-gray-800">
              <NavLink to={`/groups`}>groups</NavLink>
            </button>
          </div>
        </div>
        <div className="me-4 block rounded-lg bg-white shadow-secondary-1 dark:bg-surface-dark dark:text-white text-surface">
          <div className="p-6">
            <h5 className="mb-2 text-xl font-medium leading-tight">
              Examine your All the members
            </h5>
            <button className="flex ml-[5%] items-center gap-2 px-4 py-2 bg-gray-200 hover:scale-110 text-gray-700 rounded hover:text-white hover:bg-gray-800">
              <NavLink to="/users">Users</NavLink>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default User;

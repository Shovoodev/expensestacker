import { NavLink } from "react-router";
import { useUser } from "../hook/use-user";
import GeneralNavbar from "./GeneralNavbar";

const User = () => {
  const { user } = useUser();
  return (
    <>
      <GeneralNavbar client={user?.username} />
      <div className="mb-6 flex ">
        <button className="flex ml-[5%] items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300">
          <NavLink to={`/groups`}>groups</NavLink>
        </button>
        <button className="flex ml-[5%] items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300">
          <NavLink to="/members">Members</NavLink>
        </button>
      </div>
    </>
  );
};

export default User;

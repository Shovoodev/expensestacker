import Group from "../group/Group";
import { useUser } from "../hook/use-user";
import Product from "../products/Product";
import GroupeNavbar from "./GroupeNavbar";
import Sidebar from "./Sidebar";

const User = () => {
  const { user } = useUser();

  return (
    <>
      <Sidebar client={user?.username} />
      <GroupeNavbar />
      <Group />
    </>
  );
};

export default User;

import { Route, Routes, useResolvedPath } from "react-router";
import LandingPage from "./components/pages/LandingPage";
import SignIn from "./components/Auth/SignIn";
import User from "./components/main/User";
import Group from "./components/group/Group";
import Product from "./components/products/Product";
import Expenses from "./components/expenses/Expenses";
import { useUser } from "./components/hook/use-user";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EditProduct from "./components/products/EditProduct";
import GroupMembers from "./components/members/GroupMembers";
import AddInGroup from "./components/members/main/AddInGroup";
import Profile from "./components/profile/Profile";
import JoinInGroup from "./components/members/newMember/JoinInGroup";
import SignUp from "./components/Auth/SignUp";
const routes = [
  {
    path: "/",
    element: <LandingPage />,
    isPrivate: false,
  },
  {
    path: `/invite/register?token=:token`,
    element: <JoinInGroup />,
    isPrivate: false,
  },
  {
    path: "/signin",
    element: <SignIn />,
    isPrivate: false,
  },
  {
    path: "/signup",
    element: <SignUp />,
    isPrivate: false,
  },
  {
    path: "/users",
    element: <GroupMembers />,
    isPrivate: true,
  },
  {
    path: "/:groupId/expense/:expenseId/products",
    element: <Product />,
    isPrivate: true,
  },
  {
    path: "/expense/:expenseId/product/:productId",
    element: <EditProduct />,
    isPrivate: true,
  },
  {
    path: "/group/:groupId/expenses",
    element: <Expenses />,
    isPrivate: true,
  },
  {
    path: "/groups",
    element: <Group />,
    isPrivate: true,
  },
  {
    path: "/user",
    element: <User />,
    isPrivate: true,
  },
  {
    path: "/test",
    element: <AddInGroup />,
    isPrivate: true,
  },
  {
    path: "/profile",
    element: <Profile />,
    isPrivate: true,
  },
];
function App() {
  const { user } = useUser();
  const navigate = useNavigate();

  const { pathname } = useResolvedPath();

  const currentRoute = routes.find((i) => {
    return i.path === pathname;
  });
  const pathfinder = () => {
    if (!user?._id && pathname !== "/signin") {
      // navigate("/signin");
    } else if (user?._id && currentRoute?.isPrivate === false) {
      // navigate("/user");
    }
  };
  useEffect(() => {
    pathfinder();
  }, [user, pathname, navigate, currentRoute]);

  return (
    <>
      <Routes>
        {routes.map(({ id, path, element }) => {
          return <Route key={id} path={path} element={element}></Route>;
        })}
      </Routes>
    </>
  );
}

export default App;

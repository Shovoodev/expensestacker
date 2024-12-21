import { Route, Routes, useResolvedPath } from "react-router";
import LandingPage from "./components/pages/LandingPage";
import SignIn from "./components/Auth/SignIn";
import SignUp from "./components/Auth/SignUp";
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

const routes = [
  {
    path: "/",
    element: <LandingPage />,
    isPrivate: false,
  },
  {
    path: "/signin",
    element: <SignIn />,
    isPrivate: false,
  },
  {
    path: "/users",
    element: <GroupMembers />,
    isPrivate: false,
  },
  {
    path: "/expense/:expenseId/products",
    element: <Product />,
    isPrivate: false,
  },
  {
    path: "/expense/:expenseId/product/:productId",
    element: <EditProduct />,
    isPrivate: false,
  },
  {
    path: "/group/:groupId/expenses",
    element: <Expenses />,
    isPrivate: false,
  },
  {
    path: "/groups",
    element: <Group />,
    isPrivate: false,
  },
  {
    path: "/user",
    element: <User />,
    isPrivate: false,
  },
  {
    path: "/test",
    element: <AddInGroup />,
    isPrivate: false,
  },
];
function App() {
  const { user } = useUser();
  const navigate = useNavigate();
  // console.log({ user });

   const { pathname } = useResolvedPath();

  const currentRoute = routes.find((i) => {
    return i.path === pathname;
  });
  useEffect(() => {
    if (!user?._id) {
      // navigate("/signin");
    } else if (user?._id && !currentRoute?.isPrivate) {
      //navigate("/user");
    }
  }, [user, pathname]);

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

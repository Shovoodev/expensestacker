import { Route, Routes } from "react-router";
import LandingPage from "./components/pages/LandingPage";
import SignIn from "./components/Auth/SignIn";
import SignUp from "./components/Auth/SignUp";
import User from "./components/main/User";
import Group from "./components/group/Group";
import Product from "./components/products/Product";
import Expenses from "./components/expenses/Expenses";
import { useUser } from "./components/hook/use-user";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import EditProduct from "./components/products/EditProduct";
import GroupMembers from "./components/members/GroupMembers";

function App() {
  //   const { user } = useUser();
  //   const navigate = useNavigate();
  //  console.log({user});

  //   const { pathname } = useResolvedPath();

  //   const currentRoute = routes.find((i) => {
  //     return i.path === pathname;
  //   });
  //   useEffect(() => {
  // console.log({
  //   user,
  //   privateRoute,
  //   pathname,
  //   test: !user?._id && privateRoute.includes(pathname),
  // });

  //   if (!user?._id && currentRoute?.isPrivate) {
  //   // navigate("/signin");
  //   } else if (user?._id && !currentRoute?.isPrivate) {
  //    // navigate("/user");
  //   }
  // }, [user, pathname]);

  return (
    <>
      {/* <Routes>
        {routes.map(({ id, path, element }) => {
          return <Route key={id} path={path} element={element}></Route>;
        })}
      </Routes> */}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/members" element={<GroupMembers />} />
        <Route path="/expense/:expenseId/products" element={<Product />} />
        <Route
          path="/expense/:expenseId/product/:productId"
          element={<EditProduct />}
        />
        <Route path="/group/:groupId/expenses" element={<Expenses />} />
        <Route path="/groups" element={<Group />} />
        <Route path="/user" element={<User />} />
      </Routes>
    </>
  );
}

export default App;

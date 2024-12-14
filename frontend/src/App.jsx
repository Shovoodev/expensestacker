import { Route, Routes } from "react-router";
import LandingPage from "./components/pages/LandingPage";
import SignIn from "./components/Auth/SignIn";
import SignUp from "./components/Auth/SignUp";
import User from "./components/main/User";
import Group from "./components/group/Group";
import Product from "./components/products/Product";
import Expenses from "./components/expenses/Expenses";
import { useUser } from "./components/hook/use-user";
import { useEffect } from "react";

// const routes = [
//   {
//     path: "/",
//     element: <LandingPage />,
//     isPrivate: false,
//   }, {
//     path: "/signin",
//     element: <SignIn />,
//     isPrivate: false,
//   }, {
//     path: "/signup",
//     element: <SignUp />,
//     isPrivate: false,
//   }, {
//     path: "/user",
//     element: <User />,
//     isPrivate: true,
//   }, {
//     path: "/groups",
//     element: <Group />,
//     isPrivate: true,
//   },{
//     path: `/group/:groupId/expenses`,
//     element: <Expenses />,
//     isPrivate: true,
//   }, {
//     path: "/group/:groupId/exppense/:expenseId/products",
//     element: <Product />,
//     isPrivate: true,
//   },
// ];

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
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/group/:groupId/expense/:expenseId/products"
          element={<Product />}
        />
        <Route path="/group/:groupId/expenses" element={<Expenses />} />
        <Route path="/groups" element={<Group />} />
        <Route path="/user" element={<User />} />
      </Routes>
    </>
  );
}

export default App;

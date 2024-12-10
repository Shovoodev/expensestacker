import BoardPage from "./components/pages/BoardPage";
import { Route, Routes } from "react-router";
import LandingPage from "./components/pages/LandingPage";
import SignIn from "./components/Auth/SignIn";
import SignUp from "./components/Auth/SignUp";
import GroupPage from "./components/pages/GroupPage";
import ProductPage from "./components/pages/ProductPage";
import User from "./components/main/User";
import LoadingSceen from "./components/main/LoadingSceen";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/admin" element={<BoardPage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        {/* <Route path="/group" element={<GroupPage />} /> */}
        <Route path="/group/:groupId/products" element={<ProductPage />} />
        <Route path="/user" element={<User />} />
        <Route path="/spinner" element={<LoadingSceen />} />
      </Routes>
    </>
  );
}

export default App;

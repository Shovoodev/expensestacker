import { useState } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { useNavigate } from "react-router-dom";
import LoadingSceen from "../main/LoadingSceen";
const SignIn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    await e.preventDefault();
    console.log(userData);
    setIsLoading(true);
    await fetch("http://localhost:3333/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
      credentials: "include", 
    })
      .then((res) => res.json())
      .then(async (data) => {
        if (data._id) {
          setTimeout(() => {
            setIsLoading(true);
            navigate("/admin");
            setIsLoading(false)
          }, 1000);
          localStorage.setItem("user", JSON.stringify(data));
        }
      })
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {isLoading ? (
        <LoadingSceen />
      ) : (
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-bold text-center mb-6">Log In </h2>
          <form onSubmit={handleSubmit}>
            <Input
              type="email"
              label="Enter email"
              onChange={(e) =>
                setUserData({ ...userData, email: e.target.value })
              }
            />
            <Input
              type="password"
              label="Enter Password"
              onChange={(e) =>
                setUserData({ ...userData, password: e.target.value })
              }
            />
            <Button
              className="w-[50%] ml-[25%] mt-4 bg-blue-500 text-white py-2 px-2 rounded-md hover:bg-blue-600  "
              type="submit"
            >
              SignIn
            </Button>
          </form>
        </div>
      )}
    </div>
  );
};

export default SignIn;

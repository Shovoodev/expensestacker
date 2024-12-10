import { useState } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { NavLink } from "react-router";


const SignUp = () => {
  const [data, setData] = useState({ email: "", password: "", username: "" });

  const handleSubmit = async(e) => {
    e.preventDefault();
    await fetch("http://localhost:3333/auth/register", {
        method : "POST" ,
        headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data) })
      console.log(data)
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">Register</h2>
    <form onSubmit={handleSubmit} className="w-full pb-2">
      <Input
        label="Enter Username"
        onChange={(e) =>
          setData({ ...data, username: e.target.value })
        }
      />
      <Input
      type="email"
        label="Enter Email"
        onChange={(e) => setData({ ...data, email: e.target.value })}
      />
      <Input
      type="password"
        label="Enter Password"
        onChange={(e) =>
          setData({ ...data, password: e.target.value })
        }
      />
      <Button className="w-[50%] ml-[25%] mt-4 bg-blue-500 text-white py-2 px-2 rounded-md hover:bg-blue-600  " type="submit"> Submit </Button>
    </form>
    <div className=" flex-initial">
      already have an account <NavLink className="ml-5 text-lgpy-2 px-4 py-1 rounded-md hover:bg-blue-600  bg-blue-500 text-white" to="/signin"> LogIn</NavLink>
    </div>
    </div>
    </div>
  );
};

export default SignUp;
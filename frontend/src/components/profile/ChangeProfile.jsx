import React, { useEffect, useState } from "react";
import { useUser } from "../hook/use-user";
import UpdateProfileDetail from "./updates/UpdateProfileDetail";
import UpdateFinansialDetails from "./updates/UpdateFinansialDetails";
import InputsOfUserDetails from "./InputsOfUserDetails";
const ChangeProfile = () => {
  const { user } = useUser();
  const [activeView, setActiveView] = useState("");
  const [data, setData] = useState({
    firstname: "",
    lastname: "",
    bio: "",
    email: "",
    address: "",
    phone: "",
  });

  const userEmail = JSON.stringify({ email: user?.email });
  const getAllDetails = async () => {
    await fetch(`http://localhost:3333/userdetails`, {
      credentials: "include",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: userEmail,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log({ data });
        setData(data);
      });
  };
  useEffect(() => {
    getAllDetails();
  }, [userEmail]);
  const toggleView = (view) => {
    setActiveView((prev) => (prev === view ? "" : view));
  };
  return (
    <>
      <div className="container mx-auto mt-4 p-4 max-w-4xl bg-slate-500 rounded-lg shadow-lg">
        <h2 className="text-2xl font-semibold text-white mb-4">User Details</h2>
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-2">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-100 mb-2"
            >
              User Name
            </label>
            <input
              disabled
              type="text"
              id="username"
              className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              value={user?.username}
              alt="User Name Cannot be changed once set"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-100 mb-2"
            >
              Email
            </label>
            <input
              disabled
              type="text"
              id="email"
              className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2.5 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
              value={user?.email}
              alt="Email Cannot be changed once set"
            />
          </div>
        </div>

        <div className="grid gap-6 mt-6 sm:grid-cols-2 md:grid-cols-2">
          {data ? (
            <>
              <InputsOfUserDetails
                children={data.firstname}
                field="First Name"
              />
              <InputsOfUserDetails children={data.lastname} field="Last Name" />
              <InputsOfUserDetails children={data.address} field="Address" />
              <InputsOfUserDetails children={data.phone} field="Phone" />
              <InputsOfUserDetails children={data.bio} field="Bio" />
            </>
          ) : (
            <>"NO detail recorder"</>
          )}
        </div>
      </div>

      <div className=" p-2 flex justify-center ">
        <button
          className=" font-bold text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300  rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:gray:ring-blue-800"
          onClick={() => toggleView("profile")}
        >
          Update profile
        </button>

        <button
          className="text-white ml-4 bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-bold rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:gray:ring-blue-800"
          onClick={() => toggleView("finance")}
        >
          Financial details
        </button>
      </div>

      {activeView === "profile" && (
        <div className="max-w-4xl bg-gray-500 mx-auto rounded-lg shadow-lg p-6">
          <UpdateProfileDetail user={user} />
        </div>
      )}
      {activeView === "finance" && (
        <div className="max-w-4xl bg-gray-500 mx-auto rounded-lg shadow-lg p-3">
          <h1 className="text-white"> Optional field</h1>
          <UpdateFinansialDetails user={user} />
        </div>
      )}
    </>
  );
};

export default ChangeProfile;

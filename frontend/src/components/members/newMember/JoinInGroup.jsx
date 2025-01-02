import React, { useEffect, useState } from "react";
import Input from "../../ui/Input";
import { NavLink } from "react-router";
import { useUser } from "../../hook/use-user";
import { useNavigate, useSearchParams } from "react-router-dom";
const JoinInGroup = () => {
  const { user } = useUser();
  const [searchParams, setSearchParams] = useSearchParams();

  const token = searchParams.get("token");
  console.log({ token });
  const navigate = useNavigate();

  useEffect(() => {
    // check if token is in query string and user is logged in
    // if user is not logged in, send him to login page with existing query strings
    // then from there we join the user to the group
    // else if the user is logged in
    // join the user to group
    //

    if (!token) return;

    if (!user) {
      navigate(`/auth/signin?token=${token}`);
    } else {
    }
  }, [token, user]);

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const groupId = searchParams.get();
  //   const userId = searchParams.get(user?._id);
  //   await fetch(
  //     `http://localhost:3333/invite/register/${groupId}/${userId}/invitation/join`,
  //     {
  //       method: "PATCH",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(token),
  //     }
  //   ).then(() => {
  //     navigate(`/groups`);
  //   });
  // };
  return (
    <>
      <div className="absolute top-[20%] left-[50%] transform -translate-x-1/2 bg-gray-100 flex w-[90%] lg:w-[50%] flex-col items-center justify-center max-w-lg rounded-lg shadow-lg p-6">
        <h3 className="text-2xl font-bold text-blue-700 animate-pulse">
          Joining Group...
        </h3>
      </div>
    </>
  );
};

export default JoinInGroup;

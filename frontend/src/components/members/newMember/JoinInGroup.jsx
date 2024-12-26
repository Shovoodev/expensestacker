import React, { useEffect, useState } from "react";
import Input from "../../ui/Input";
import { NavLink } from "react-router";
import { useUser } from "../../hook/use-user";
import { useNavigate, useSearchParams } from "react-router-dom";
const JoinInGroup = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const [searchParams, setSearchParams] = useSearchParams();
    await fetch(
      `http://localhost:3333/invite/register/${groupId}/${userId}/invitation/join`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(token),
      }
    ).then(() => {
      navigate(`/groups`);
    });
  };
  return (
    <>
      <div className="absolute top-[20%] left-[50%] transform -translate-x-1/2 bg-gray-100 flex w-[90%] lg:w-[50%] flex-col items-center justify-center max-w-lg rounded-lg shadow-lg p-6">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 w-full max-w-xs"
        >
          <Input
            label="Enter Group Token to join Group"
            onChange={(e) =>
              setSearchParams({
                token: e.target.value,
              })
            }
          />
          <button
            className="w-full bg-gray-600 hover:bg-gray-700 text-white py-2 rounded-lg transition"
            type="submit"
          >
            Add In Group
          </button>
          <div>
            if not signin please
            <NavLink to="/signin">
              <button className=" ml-4 bg-blue-600 px-2 text-white hover:bg-blue-800  py-2 rounded-lg transition">
                signin
              </button>
            </NavLink>
          </div>
        </form>
      </div>
    </>
  );
};

export default JoinInGroup;

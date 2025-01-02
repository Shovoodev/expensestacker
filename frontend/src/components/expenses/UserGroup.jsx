import React, { useState } from "react";
const UserGroup = ({ username }) => {
  const [loading, setLoading] = useState();
  return (
    <>
      <div className="w-56 px-1 py-1  text-center bg-gray-50 hover:bg-gray-400 rounded-lg lg:mt-0 xl:px-10">
        <div className="space-y-1 xl:space-y-6">
          <img
            className="mx-auto rounded-full h-20 w-20"
            src="/default.jpg"
            alt="author avatar"
          />
          <div className="">
            <div className="flex justify-center items-center flex-col space-y-3 text-lg font-medium leading-6">
              <h3 className="text-black  hover:scale-110">{username}</h3>
              <div className="flex justify-center mt-5 text-black  space-x-5">
                <button className=" hover:scale-110"> Expenses</button>
                <button className=" hover:scale-110"> groups </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserGroup;

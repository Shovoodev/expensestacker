import React, { useState } from "react";
const UserGroup = ({ username }) => {
  const [loading, setLoading] = useState();
  return (
    <>
      <div class="w-56 px-6 py-6  text-center bg-gray-50 hover:bg-gray-400 rounded-lg lg:mt-0 xl:px-10">
        <div class="space-y-4 xl:space-y-6">
          <img
            class="mx-auto rounded-full h-36 w-36"
            src="/default.jpg"
            alt="author avatar"
          />
          <div class="space-y-2">
            <div class="flex justify-center items-center flex-col space-y-3 text-lg font-medium leading-6">
              <h3 class="text-black  hover:scale-110">{username}</h3>
              <div class="flex justify-center mt-5 text-black  space-x-5">
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

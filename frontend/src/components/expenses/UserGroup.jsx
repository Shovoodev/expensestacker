import React from "react";
const UserGroup = ({ username }) => {
  return (
    <>
      <div className="w-36 py-4 mr-4 text-center bg-gray-50 hover:bg-gray-400 rounded-lg lg:mt-0 xl:px-10">
        <div className="space-y-1 xl:space-y-6">
          <div className="flex gap-3">
            <div className="flex justify-center items-center gap-3 text-lg h-full font-medium leading-6">
              <img
                className="mx-auto rounded-full h-10 w-10"
                src="/default.jpg"
                alt="author avatar"
              />
              <h3 className="  hover:scale-110">{username}</h3>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserGroup;

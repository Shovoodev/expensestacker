import { Bell, Mail, User } from "lucide-react";
import React from "react";
import { NavLink } from "react-router";
import { useUser } from "./../hook/use-user";
const ProfileNavbar = () => {
  const { user } = useUser();
  return (
    <>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center space-x-6">
          <img
            src="/default.jpg"
            alt="Profile Picture"
            class="w-24 h-24 rounded-full border"
          />
          <div className="flex-1">
            <h1 className="text-2xl font-bold">{user?.username}</h1>

            <div className="mt-4 flex space-x-4">
              <button className=" bg-gray-600 hover:bg-gray-800 text-white px-4 py-2 rounded-md">
                Follow
              </button>
              <button className="bg-gray-100  text-gray-700 px-4 py-2 rounded-md">
                Join in group
              </button>
              <button className=" bg-gray-600 hover:bg-gray-800 text-white px-4 py-2 rounded-md">
                Total Spend in This month
              </button>
            </div>
          </div>
          <div className="flex space-x-6">
            <div className="text-center">
              <p className="text-xl font-semibold">0</p>
              <p className="text-gray-500">Followers</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-semibold">0</p>
              <p className="text-gray-500">groups</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileNavbar;

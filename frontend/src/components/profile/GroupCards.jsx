import React from "react";
import { NavLink } from "react-router";
const GroupCards = ({ groupName, groupId }) => {
  return (
    <div class="bg-white p-4 w-full rounded-lg shadow-md">
      <img
        src="https://via.placeholder.com/300"
        alt="VPN Mobile App"
        class="rounded-lg"
      />
      <div class="mt-4">
        <h2 class="text-lg font-semibold">{groupName}</h2>
        <div class="flex justify-between mt-4 text-gray-600">
          <NavLink to={`/group/${groupId}/expenses`}>
            <button className=" px-4 bg-gray-600 text-lg hover:bg-gray-800 text-white py-2 rounded-lg transition">
              detail
            </button>
          </NavLink>
          <span className=" text-sm"> Expenses On group</span>
        </div>
      </div>
    </div>
  );
};

export default GroupCards;

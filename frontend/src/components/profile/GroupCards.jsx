import React from "react";
import { NavLink } from "react-router";
import FormatDate from "../Helper";
const GroupCards = ({
  groupName,
  groupId,
  className,
  type = "button",
  created_at,
  isActive,
}) => {
  const viewDate = FormatDate(created_at);
  return (
    <div className="flex justify-center items-center p-4">
      <div className="h-auto w-80 bg-gray-100 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
        <div className="flex flex-col items-center gap-4 p-6">
          <h2 className="text-xl font-semibold text-gray-800 truncate">
            {groupName}
          </h2>
          <div className="flex justify-center">
            <NavLink to={`/group/${groupId}/expenses`}>
              <button className="px-5 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-800 transition duration-300 text-sm">
                View Details
              </button>
            </NavLink>
          </div>
          <div className="w-full bg-gray-200 h-px mt-4"></div> {/* Separator */}
          <div className="flex justify-between w-full text-gray-600 text-sm mt-2">
            <div>
              <p className="font-medium">Date:</p>
              <p>{viewDate}</p>
            </div>
            <div>
              <p className="font-medium">Status:</p>
              <p>{isActive}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupCards;

import React from "react";
import { NavLink } from "react-router";

const GroupUsers = ({ client }) => {
  return (
    <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
      <th
        scope="row"
        class="px-6 py-4 font-medium text-white  whitespace-nowrap dark:text-white"
      >
        {client}
      </th>
    </tr>
  );
};

export default GroupUsers;

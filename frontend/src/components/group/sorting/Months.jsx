import React, { useState } from "react";

import { MenuItem } from "@headlessui/react";
const Months = ({ month, onChange }) => {
  return (
    <>
      <MenuItem>
        <button
          onChange={onChange}
          onClick={() => onChange({ target: { value: month } })}
          className="block w-full p-1 font-semibold text-left data-[focus]:bg-blue-100 hover:bg-white hover:text-black  "
        >
          {month}
        </button>
      </MenuItem>
    </>
  );
};

export default Months;

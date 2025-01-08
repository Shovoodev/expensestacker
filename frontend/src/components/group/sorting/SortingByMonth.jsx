import React, { useState } from "react";

import { Menu, MenuButton, MenuItems } from "@headlessui/react";
import Months from "./Months";

const SortingByMonth = () => {
  const [monthSelector, setMonthSelector] = useState();
  const FormatMonth = (isoDate) => {
    const date = new Date(isoDate);
    const month = date.toLocaleString("default", { month: "long" }); // e.g., "January"
    return month;
  };

  const handleChange = async (e) => {
    const { value } = e.target;
    setMonthSelector(value);
    await fetch(`http://localhost:3333/groups`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data === null) return;
        else if (data != null) {
          const uniqueMonths = new Set();
          const dated = data
            .filter((item) => item !== null)
            .map((val) => FormatMonth(val.created_at))
            .filter((month) => {
              if (uniqueMonths.has(month)) {
                return false;
              }
              uniqueMonths.add(month);
              return true;
            });
          // to do this work . when i push month i will show that month expenses
          return dated;
        }
      })
      .then(() => {})
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <Menu>
        <MenuButton>
          <button className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-gray-700 rounded-lg hover:bg-gray-800  uppercase">
            month
          </button>
        </MenuButton>
        <MenuItems
          anchor="bottom"
          className=" bg-gray-600 p-1 rounded text-white  gap-3"
        >
          <Months month="January" onChange={handleChange} />
          <Months month="February" onChange={handleChange} />
          <Months month="march" onChange={handleChange} />
          <Months month="April" onChange={handleChange} />
          <Months month="May" onChange={handleChange} />
          <Months month="June" onChange={handleChange} />
          <Months month="July" onChange={handleChange} />
          <Months month="August" onChange={handleChange} />
          <Months month="September" onChange={handleChange} />
          <Months month="October" onChange={handleChange} />
          <Months month="November" onChange={handleChange} />
          <Months month="December" onChange={handleChange} />
        </MenuItems>
      </Menu>
      <Menu></Menu>
    </>
  );
};

export default SortingByMonth;

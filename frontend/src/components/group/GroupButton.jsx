import React, { useEffect, useState } from "react";
import { useGroup } from "../hook/use-group";
import { NavLink, useParams } from "react-router";

const GroupButton = ({ groupId ,name, className, type = "button", onClick }) => {
  const { setAllGroups , allGroups } = useGroup();
  const handleDelete = async () => {
    await fetch("http://localhost:3333/group/delete/" + groupId, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(() => {
        setAllGroups();
      })
      .catch((error) => {
        console.error(error);
      });
  };


  return (
    <>
    <button type={type} className={"inline-block rounded-full border-2 border-primary px-6 pb-[6px] pt-2 text-xs font-medium uppercase  text-primary transition duration-150 ease-in-out hover:border-primary-accent-300  hover:text-primary-accent-300  hover:bg-gray-600 hover:text-white dark:text-primary-500 dark:hover:bg-blue-950 dark:focus:bg-blue-950 " + className}>
    <NavLink to={`/group/${groupId}/expenses`} >
      {name}
      </NavLink>
    </button>
    </>
  );
};

export default GroupButton;

import React, { useEffect, useState } from "react";
import { useGroup } from "../hook/use-group";
import { NavLink, useParams } from "react-router";
import { MoveRight } from "lucide-react";

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
    <NavLink className=" gap-3 inline-block" to={`/group/${groupId}/expenses`} >
    <button type={type} className={"inline-flex items-center px-4 py-5 text-sm font-medium text-center text-white bg-gray-700 rounded-lg hover:bg-gray-800  uppercase " + className}>
      {name}
      <MoveRight size={20} strokeWidth={1} absoluteStrokeWidth />
    </button>
      </NavLink>
    </>
  );
};

export default GroupButton;

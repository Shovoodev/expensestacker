import React from "react";
import { useGroup } from "../hook/use-group";
import { NavLink } from "react-router";

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
    <button onClick={onClick} type={type} className={"flex gap-3  " + className}>
      <NavLink to={`/group/${groupId}/products`}>
      {name}
      </NavLink>
      <button onClick={handleDelete} className="text-sm bg-red-500 rounded text-white p-1">
        Delete
      </button>
    </button>
  );
};

export default GroupButton;

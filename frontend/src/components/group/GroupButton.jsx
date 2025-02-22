import React, { useEffect, useState } from "react";
import { useGroup } from "../hook/use-group";
import { NavLink, useParams } from "react-router";
import { MoveRight } from "lucide-react";
import FormatDate from "../Helper";
const GroupButton = ({
  groupId,
  name,
  className,
  type = "button",
  created_at,
}) => {
  const { setAllGroups, allGroups } = useGroup();
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
  const viewDate = FormatDate(created_at);
  return (
    <>
      <div className="flex justify-center items-center">
        <div className=" h-60 w-60 bg-gray-200 rounded shadow-lg">
          <div className=" items-center gap-5 justify-between  flex mt-4">
            <h1 className="ml-5">{name}</h1>
            <NavLink
              className=" gap-3 inline-block"
              to={`/group/${groupId}/expenses`}
            >
              <button
                type={type}
                className={
                  "inline-flex items-center px-4 py-5 text-sm font-medium text-center text-white bg-gray-700 rounded-lg hover:bg-gray-800  uppercase " +
                  className
                }
              >
                <MoveRight size={20} strokeWidth={1} absoluteStrokeWidth />
              </button>
            </NavLink>
          </div>
          <br className="shodow-black" />
          <div className="flex p-2">
            <div className=" mt-5 ml-6 p-5">
              <p> Created By : </p>
              <p>data : {viewDate}</p>
            </div>
            <div></div>
          </div>
        </div>
      </div>
      {/* <NavLink className=" gap-3 inline-block" to={`/group/${groupId}/expenses`} >
    <button type={type} className={"inline-flex items-center px-4 py-5 text-sm font-medium text-center text-white bg-gray-700 rounded-lg hover:bg-gray-800  uppercase " + className}>
      {name}
      <MoveRight size={20} strokeWidth={1} absoluteStrokeWidth />
    </button>
      </NavLink> */}
    </>
  );
};

export default GroupButton;

import React, { useEffect, useState } from "react";
import GeneralNavbar from "../main/GeneralNavbar";
import UserSidebar from "./main/UserSidebar";

const GroupMembers = () => {
  const [users, setUsers] = useState({ name: "" });
  const [loading, setLoading] = useState(false);
  const allUsers = async () => {
    await fetch(`http://localhost:3333/users`)
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
      });
  };
  useEffect(() => {
    allUsers();
  }, []);
  return (
    <>
      <UserSidebar/>
      <div>
        <h1>List of all Members</h1>
      </div>
      <div className=" flex-col justify-center gap-5">
        {loading ? (
          <p>Loading...</p>
        ) : users && users.length > 0 ? (
          users.map(({ _id, username }) => {
            return <h1 key={_id}> {username} </h1>;
          })
        ) : (
          <p>No groups found.</p>
        )}
      </div>
    </>
  );
};

export default GroupMembers;

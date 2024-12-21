import React, { useEffect, useState } from "react";

const AddInGroup = () => {
  const groupId = "6761859e4f8c9bfe632e5d81";
  const [jsonData, setJsonData] = useState();
  const displayMembersInGroup = async () => {
    await fetch(`http://localhost:3333/${groupId}/members/users`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setJsonData(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    displayMembersInGroup();
  }, []);
  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Users and Groups</h1>
      {jsonData?.map((user, index) => (
        <div
          key={index}
         
        >
          {user.username}
        </div>
      ))}
    </div>
  );
};

export default AddInGroup;

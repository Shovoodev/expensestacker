import React, { useEffect, useState } from "react";

const AddInGroup = () => {
  const groupId = "6761859e4f8c9bfe632e5d81";
  const [jsonData, setJsonData] = useState();
  const displayMembersInGroup = async () => {
    await fetch(`http://localhost:3333/${groupId}/members`)
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
      {jsonData?.users?.map((user, index) => (
        <div
          key={index}
          style={{
            border: "1px solid #ccc",
            marginBottom: "10px",
            padding: "10px",
            borderRadius: "5px",
          }}
        >
          <h3>User ID: {user._id}</h3>
          <h4>Groups:</h4>
          <ul>
            {user?.memberIds?.map((id) => (
              <li key={id}> {id}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default AddInGroup;

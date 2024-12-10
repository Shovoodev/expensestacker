import React, { useState, useEffect } from "react";
import Input from "../ui/Input";
import Button from "../ui/Button";
import { useGroup } from "../hook/use-group";
import GroupButton from "./GroupButton";

const Group = () => {
  const [newGroup, setNewGroup] = useState({ groupName: "" });
  const { allGroups, setAllGroups } = useGroup();
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await fetch(`http://localhost:3333/group/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newGroup),
    })
      .then(() => {
        setAllGroups(allGroups);
      })
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  };

  return (
    <>
      <div className="flex justify-center border w-[80%] ml-[20%] rounded-xl ">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-2 w-full max-w-xs md:flex md:justify-center mb-6 pt-4"
        >
          <Input
            label="Your Group Name"
            onChange={(e) => setNewGroup({ ...newGroup, name: e.target.value })}
          />
          <Button type="submit">ADD Entry</Button>
        </form>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 place-items-center gap-1 p-6">
        {loading ? (
          <p>Loading...</p>
        ) : allGroups && allGroups.length > 0 ? (
          allGroups.map(({ _id, name }) => {
            return (
              <GroupButton groupId={_id} key={_id} name={name}></GroupButton>
            );
          })
        ) : (
          <p>No groups found.</p>
        )}
      </div>
    </>
  );
};

export default Group;

import React, { useState, useEffect } from "react";
import Input from "../ui/Input";
import GroupButton from "./GroupButton";
import GeneralNavbar from "../main/GeneralNavbar";
import { useUser } from "../hook/use-user";
import Sidebar from "../main/Sidebar";

const Group = () => {
  const [newGroup, setNewGroup] = useState({ groupName: "" });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [allGroups, setAllGroups] = useState();
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const userGroups = async () => {
    await fetch(`http://localhost:3333/groups`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setAllGroups(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    userGroups();
  }, []);

  const handleSubmit = async (e) => {
    const userId = user?._id;
    e.preventDefault();
    setLoading(true);
    await fetch(`http://localhost:3333/${userId}/group/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newGroup),
    })
      .then(() => {
        setAllGroups(allGroups);
      })
      .then(() => userGroups())
      .then(() => setIsModalOpen(false))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  };
  return (
    <>
      <GeneralNavbar fieldHeader="All groups" />
      <div className="flex">
        <Sidebar />
        <div className="flex-1 p-5">
          <div className="flex flex-wrap gap-4 p-2 ">
            {loading ? (
              <p>Loading...</p>
            ) : allGroups && allGroups.length > 0 ? (
              allGroups.map(({ _id, name }) => {
                return (
                  <GroupButton
                    groupId={_id}
                    key={_id}
                    name={name}
                  ></GroupButton>
                );
              })
            ) : (
              <p>No groups found.</p>
            )}
            <button
              className="flex-col rounded-full shadow-xl text-xl border-2 border-primary px-6 py-2 pt-2 hover:text-white hover:bg-gray-800 font-medium uppercase "
              onClick={() => setIsModalOpen(!isModalOpen)}
            >
              {isModalOpen ? <p>minimize</p> : <p>ADD New Group</p>}
            </button>
          </div>
        </div>
        <div>
          {isModalOpen && (
            <div className="absolute top-[20%] left-[50%] transform -translate-x-1/2 bg-gray-100 flex w-[90%] lg:w-[50%] flex-col items-center justify-center max-w-lg rounded-lg shadow-lg p-6">
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-2 w-full max-w-xs md:flex md:justify-center mb-6 pt-4"
              >
                <Input
                  label="Your Group Name"
                  className=""
                  onChange={(e) =>
                    setNewGroup({ ...newGroup, name: e.target.value })
                  }
                />
                <button
                  className="mt-6 mb-2 w-40 px-2 py-2 ml-12 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
                  type="submit"
                >
                  ADD Entry
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Group;

import React, { useState, useEffect } from "react";
import Input from "../ui/Input";
import GroupButton from "./GroupButton";
import GeneralNavbar from "../main/GeneralNavbar";
import { useUser } from "../hook/use-user";
import Sidebar from "../main/Sidebar";
import SortingByMonth from "./sorting/SortingByMonth";
import { X } from "lucide-react";
import GroupeNavbar from "../main/GroupeNavbar";
const Group = () => {
  const [newGroup, setNewGroup] = useState({ groupName: "" });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [allGroups, setAllGroups] = useState();
  const [loading, setLoading] = useState(false);
  const [month, setMonth] = useState();
  const { user } = useUser();

  const userGroups = async () => {
    await fetch(`http://localhost:3333/groups`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log({ data });

        if (data === null) return;
        else return setAllGroups(data);
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
      <GroupeNavbar />
      <div
        className={`flex  ${
          isModalOpen ? " blur-sm disabled:cursor-pointer " : ""
        }`}
      >
        <Sidebar />
        <div className="flex-1 p-2">
          <div className="flex gap-5 items-center ">
            <div className=" text-xl">sort by </div>
            <SortingByMonth />
          </div>
          <div className=" flex justify-end">
            <button
              className="flex-col rounded-full shadow-xl text-xl border-2 border-primary px-6 py-2 pt-2 hover:text-white hover:bg-gray-800 font-medium uppercase "
              onClick={() => setIsModalOpen(!isModalOpen)}
            >
              {isModalOpen ? <p>minimize</p> : <p>ADD New Group</p>}
            </button>
          </div>
          <div className="flex flex-wrap gap-4 p-2 ">
            {loading ? (
              <p>Loading...</p>
            ) : allGroups && allGroups.length >= 0 ? (
              allGroups.map((group) => {
                if (group === null) return;
                return (
                  <GroupButton
                    groupId={group._id}
                    key={group._id}
                    name={group.name}
                    created_at={group.created_at}
                  ></GroupButton>
                );
              })
            ) : (
              <p>No groups found.</p>
            )}
          </div>
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
              <div className="flex">
                <button
                  className="mt-6 mb-2 w-40 px-2 py-2 ml-12 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
                  type="submit"
                >
                  ADD Entry
                </button>
                <button
                  onClick={() => setIsModalOpen(!isModalOpen)}
                  className=" ml-4  items-center   text-sm text-black  rounded-lg transition"
                >
                  <div className="flex hover:bg-red-700 hover:text-white p-4 px-2 py-1 mt-3 rounded-lg items-center">
                    <span className=""> Close</span> <X />
                  </div>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </>
  );
};

export default Group;

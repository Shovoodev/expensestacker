import React, { useState, useEffect } from "react";
import Input from "../ui/Input";
import GroupButton from "./GroupButton";
import GeneralNavbar from "../main/GeneralNavbar";
import { useUser } from "../hook/use-user";

const Group = () => {
  const [newGroup, setNewGroup] = useState({ groupName: "" });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [allGroups, setAllGroups] = useState();
  const [loading, setLoading] = useState(false);
  const { user } = useUser();
  const getAllUsers = async() => {
    
  }
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
      .then(()=> userGroups())
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  };
  return (
    <>
      <GeneralNavbar fieldHeader="All groups" />
      <div>All group of user</div>
      <div className="flex flex-wrap gap-4 p-6 bg-gray-100">
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
      <button
        className="inline-block rounded-full border-2 border-success px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-success transition duration-150 ease-in-out hover:border-success-600 hover:bg-success-50/50 hover:text-success-600 focus:border-success-600  focus:text-success-600 focus:outline-none focus:ring-0 active:border-success-700 active:text-success-700 motion-reduce:transition-none dark:hover:bg-green-950 dark:focus:bg-green-950 "
        onClick={() => setIsModalOpen(!isModalOpen)}
      >
        Add New Group
      </button>
      <div>
        {isModalOpen && (
          <div className=" ml-8 bg-gray-100 flex w-80 flex-col items-center justify-center  max-w-lg  rounded-lg shadow-lg p-6">
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
    </>
  );
};

export default Group;

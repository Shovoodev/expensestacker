import React, { useEffect, useState } from "react";
import Profiles from "./Profiles";
import { useUser } from "../../hook/use-user";
import AddInGroup from "./AddInGroup";

const Surface = () => {
  const { user } = useUser();

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
      <div className=" flex justify-center">
        <div>
          <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
            <div className="grid grid-cols-3 gap-8 ">
              {loading ? (
                <p>Loading...</p>
              ) : users && users.length > 0 ? (
                users.map((user) => {
                  return <Profiles user={user}></Profiles>;
                })
              ) : (
                <p>No Users found.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Surface;

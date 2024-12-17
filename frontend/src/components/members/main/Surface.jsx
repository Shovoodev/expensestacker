import React, { useEffect, useState } from "react";
import Profiles from "./Profiles";
import { useUser } from "../../hook/use-user";

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
      <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700">
          <div className="grid grid-cols-2 gap-4 mb-4">
            {loading ? (
              <p>Loading...</p>
            ) : users && users.length > 0 ? (
              users.map(({ _id, username }) => {
                return (
                  <Profiles username={username} key={_id}>
                  </Profiles>
                );
              })
            ) : (
              <p>No Users found.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Surface;

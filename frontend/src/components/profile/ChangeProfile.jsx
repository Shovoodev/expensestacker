import React from "react";
import { useUser } from "../hook/use-user";
const ChangeProfile = () => {
  const { user } = useUser();
  return (
    <>
      <div className="max-w-6xl mx-auto p-6">
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>name : {user?.username}</div>
          <div>name : {user?.email}</div>
        </div>
      </div>
    </>
  );
};

export default ChangeProfile;

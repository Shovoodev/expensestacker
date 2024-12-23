import React from "react";
import ProfileNavbar from "./ProfileNavbar";
import Navbar from "../main/Navbar";
import GroupCards from "./GroupCards";
import { useGroup } from "./../hook/use-group";

const Profile = () => {
  const { allGroups, setAllGroups } = useGroup();
  console.log({ allGroups });

  return (
    <>
      <Navbar />
      <div className="max-w-6xl mx-auto p-6">
        <ProfileNavbar />
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {allGroups ? (
            allGroups.map(({ _id, name, groupId }) => {
              return (
                <GroupCards
                  key={_id}
                  groupId={_id}
                  groupName={name}
                ></GroupCards>
              );
            })
          ) : (
            <>
              <h1>You are not registrated in any group</h1>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;
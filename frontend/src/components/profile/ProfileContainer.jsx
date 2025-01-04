import React from "react";

import { useGroup } from "./../hook/use-group";
import GroupCards from "./GroupCards";
const ProfileContainer = () => {
  const { allGroups, setAllGroups } = useGroup();
  return (
    <>
      <div className="max-w-6xl mx-auto p-6">
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {allGroups ? (
            allGroups.map((group) => {
              if (group === null) return;
              return (
                <GroupCards
                  created_at={group.created_at}
                  isActive={group.isActive}
                  key={group._id}
                  groupId={group._id}
                  groupName={group.name}
                ></GroupCards>
              );
            })
          ) : (
            <>
              <div
                aria-label="Loading..."
                role="status"
                class="flex items-center space-x-2"
              >
                <svg
                  class="h-20 w-20 animate-spin stroke-gray-500"
                  viewBox="0 0 256 256"
                >
                  <line
                    x1="128"
                    y1="32"
                    x2="128"
                    y2="64"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="24"
                  ></line>
                  <line
                    x1="195.9"
                    y1="60.1"
                    x2="173.3"
                    y2="82.7"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="24"
                  ></line>
                  <line
                    x1="224"
                    y1="128"
                    x2="192"
                    y2="128"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="24"
                  ></line>
                  <line
                    x1="195.9"
                    y1="195.9"
                    x2="173.3"
                    y2="173.3"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="24"
                  ></line>
                  <line
                    x1="128"
                    y1="224"
                    x2="128"
                    y2="192"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="24"
                  ></line>
                  <line
                    x1="60.1"
                    y1="195.9"
                    x2="82.7"
                    y2="173.3"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="24"
                  ></line>
                  <line
                    x1="32"
                    y1="128"
                    x2="64"
                    y2="128"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="24"
                  ></line>
                  <line
                    x1="60.1"
                    y1="60.1"
                    x2="82.7"
                    y2="82.7"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="24"
                  ></line>
                </svg>
                <span class="text-4xl flex items-center justify-center text-gray-500">
                  Loading...
                </span>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default ProfileContainer;

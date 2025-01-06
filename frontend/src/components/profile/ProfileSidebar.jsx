import React, { useState } from "react";
import SettingsProfile from "./SettingsProfile";
import { Users, User, Bell, LogOut, MoveRight } from "lucide-react";
import ProfileContainer from "./ProfileContainer";
import ChangeProfile from "./ChangeProfile";

const ProfileSidebar = () => {
  const [activeView, setActiveView] = useState("");

  const showUserGroups = () => {
    setActiveView((prev) => (prev === "groups" ? "" : "groups"));
  };

  const showUserProfile = () => {
    setActiveView((prev) => (prev === "profile" ? "" : "profile"));
  };

  return (
    <>
      <div className="flex">
        <aside className="flex flex-col top-1 h-screen bg-gray-50 w-1/5">
          <div className="p-5">
            <div className="h-80 w-[110%] hover:shadow-black p-3 bg-gray-300 rounded-lg shadow-lg">
              <div className="flex gap-3 justify-center items-center mb-6 p-2">
                <img src="/default.jpg" className="h-16 w-16 rounded-full" />
              </div>
              <div>
                <ul>
                  <button
                    onClick={showUserProfile}
                    className={`flex justify-between gap-4 mb-1 w-full p-2 ${
                      activeView === "profile"
                        ? "bg-gray-900 text-white rounded-lg"
                        : "hover:bg-gray-900 hover:rounded-lg hover:text-white"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <User size={28} />
                      <span className="mr-24 p-2">Profile</span>
                    </div>
                    <MoveRight size={28} />
                  </button>
                  <button
                    onClick={showUserGroups}
                    className={`flex justify-between gap-4 w-full p-2 ${
                      activeView === "groups"
                        ? "bg-gray-900 text-white rounded-lg"
                        : "hover:bg-gray-900 hover:rounded-lg hover:text-white"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <User size={28} />
                      <span className="mr-24 mb-1  p-2">Groups</span>
                    </div>
                    <MoveRight size={28} />
                  </button>

                  <button className="flex gap-4 p-3 w-full  hover:bg-gray-900 hover:rounded-lg hover:text-white">
                    <LogOut size={28} /> LogOut
                  </button>
                </ul>
              </div>
            </div>
            <div className="sticky mb-20 top-[100vh]"></div>
          </div>
          <div className="p-5">
            <SettingsProfile />
            <div className="sticky top-[100vh]"></div>
          </div>
        </aside>
        <div className="flex-grow justify-center">
          {activeView === "groups" && <ProfileContainer />}
          {activeView === "profile" && <ChangeProfile />}
        </div>
      </div>
    </>
  );
};

export default ProfileSidebar;

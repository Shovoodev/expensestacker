import React from "react";
import { Settings, X } from "lucide-react";
const SettingsProfile = () => {
  return (
    <div className=" h-40 w-[130%] bg-gray-300 rounded-lg shadow-lg">
      <div className=" flex gap-3 items-center justify-between p-2 shadow">
        <Settings size={36} /> <span className=" text-2xl"> Settings</span>
        <X size={26} />
      </div>
      <br />
      <div className=" p-3">
        <div className=" flex justify-between">
          <button> theme</button> <span>menu</span>
        </div>
        <div className=" flex justify-between">
          <button> Language</button> <span>menu</span>
        </div>
      </div>
    </div>
  );
};

export default SettingsProfile;

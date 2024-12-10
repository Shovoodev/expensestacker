import React from "react";
import Navbar from "./Navbar";
import Group from "../group/Group";
 
const Dashboard = () => {
  return (
    <>
      <div className="flex-col w-[80%] ml-[20%]">
        <Navbar />
        <Group/>
      </div>
    </>
  );
};

export default Dashboard;

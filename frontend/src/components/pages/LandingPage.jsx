import React from "react";
import Navbar from "../main/Navbar";
import { NavLink } from "react-router";
import Footer from "../ui/Footer";
import MobileAdd from "./adpages/MobileAdd";

const LandingPage = () => {
  return (
    <div className="p-2">
      <Navbar />
      <main className="flex flex-col lg:flex-row items-center justify-between px-8 py-16 lg:px-32">
        <div className="max-w-md mb-8 lg:mb-0">
          <h1 className="text-4xl font-semibold text-gray-800 mb-4 leading-snug">
            Less stress when sharing expenses <br />
            <span className="text-red-600">with your partner.</span>
          </h1>
          <p className="text-gray-600 mb-6">
            Keep track of your shared expenses and balances with housemates,
            trips, groups, friends, and family.
          </p>
          <button className="bg-red-600 text-white px-6 py-3 rounded-md text-lg hover:bg-red-700">
            Sign up
          </button>
          <p className="text-gray-500 text-sm mt-4">
            Free for iPhone, Android, and web.
          </p>
        </div>

        <div>
          <div className=" w-96 h-96 md:w-96 md:h-96 bg-gradient-to-br  flex items-center justify-center rounded-md">
            <img src="/expenses.jpg" />
          </div>
        </div>
      </main>
      <MobileAdd />
    </div>
  );
};

export default LandingPage;

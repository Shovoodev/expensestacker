import React from "react";
import Navbar from "../main/Navbar";
import { NavLink } from "react-router";
import Footer from "../ui/Footer";

const LandingPage = () => {
  return (
    <div>
      <Navbar />
      <main className="flex-grow bg-gray-100">
        <section className="text-center py-20 bg-gray-800 text-white">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-6xl font-bold">
              Welcome to Your Website
            </h1>
            <p className="text-lg md:text-xl mt-4">Expese management</p>
            <div className="mt-6">
              <button className="bg-white text-blue-500 font-semibold px-6 py-3 rounded-md shadow hover:bg-gray-200">
                <NavLink to="/signup"> Get Started</NavLink>
              </button>
              <button className="ml-4 border border-white px-6 py-3 rounded-md shadow text-white hover:bg-blue-700">
                Learn More
              </button>

            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;

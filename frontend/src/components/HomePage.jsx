// src/components/HomePage.jsx
import React from "react";
import { Link } from "react-router-dom";
import padhi from "../assets/padhi.mp4";
import northImg from "../assets/north.jpg";
import southImg from "../assets/south.jpg";
import eastImg from "../assets/east.jpg";
import westImg from "../assets/west.jpg";

const regions = [
  { name: "East", key: "east", image: eastImg },
  { name: "West", key: "west", image: westImg },
  { name: "North", key: "north", image: northImg },
  { name: "South", key: "south", image: southImg },
];

function HomePage() {
  return (
    <div className="bg-gradient-to-b from-[#0f172a] to-[#1e293b] text-white min-h-screen font-sans">
      {/* Hero Section with Video */}
      <div className="relative">
        <video
          autoPlay
          muted
          loop
          className="w-full h-[500px] object-cover brightness-50"
        >
          <source src={padhi} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
          <h1 className="text-5xl md:text-6xl font-extrabold drop-shadow-xl">
            Welcome to DeshDarshan
          </h1>
          <p className="text-xl md:text-2xl mt-4 font-medium text-gray-200 drop-shadow">
            Discover the Beauty of Incredible India
          </p>
        </div>
      </div>

      {/* Region Cards */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center text-cyan-300 mb-12">
          Explore by Region
        </h2>
        <div className="flex flex-wrap justify-center gap-8">
          {regions.map((region) => (
            <Link
              key={region.key}
              to={`/region/${region.key}`}
              className="w-64 rounded-xl overflow-hidden bg-gray-800 shadow-lg border border-gray-700 hover:scale-105 transition duration-300"
            >
              <div className="relative group">
                <img
                  src={region.image}
                  alt={region.name}
                  className="w-full h-48 object-cover group-hover:brightness-75 transition"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition duration-300">
                  <h3 className="text-white text-2xl font-semibold drop-shadow">
                    {region.name} India
                  </h3>
                </div>
              </div>
              <div className="p-3 text-center">
                <h4 className="text-lg font-semibold text-cyan-300">
                  {region.name}
                </h4>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center text-gray-400 py-6 border-t border-gray-700 mt-16">
        <p className="italic">“Travel is the only thing you buy that makes you richer.”</p>
      </footer>
    </div>
  );
}

export default HomePage;

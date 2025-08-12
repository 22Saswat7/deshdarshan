import React from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { regionDetails } from "../regionData";

function RegionDetails() {
  const { regionKey } = useParams();
  const navigate = useNavigate();

  const region = regionDetails[regionKey];

  if (!region) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white">
        Region "{regionKey}" not found!
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white pt-6 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumb */}
        <nav className="mb-4 text-sm text-gray-300">
          <Link to="/" className="hover:underline">
            Home
          </Link>{" "}
          / <span className="capitalize">{regionKey}</span>
        </nav>

        {/* Back Button */}
        <button
          onClick={() => navigate("/")}
          className="mb-4 text-blue-200 underline underline-offset-2"
        >
          &larr; Back to Regions
        </button>

        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-white mb-6">
          {region.name}
        </h2>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {region.states.map((state) => (
            <div
              key={state.name}
              className="bg-gradient-to-br from-[#1e293b] to-[#334155] text-white rounded-xl shadow-xl overflow-hidden transition transform hover:scale-105"
            >
              {/* State Image with fallback */}
              <div className="w-full h-60 overflow-hidden bg-gradient-to-br from-blue-900 to-purple-900">
                {state.image ? (
                  <img
                    src={state.image}
                    alt={`${state.name} - Beautiful destinations and culture`}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    onError={(e) => {
                      // Hide the image and show fallback
                      e.target.style.display = 'none';
                      e.target.nextElementSibling.style.display = 'flex';
                    }}
                  />
                ) : null}
                
                {/* Fallback placeholder */}
                <div 
                  className={`w-full h-full ${state.image ? 'hidden' : 'flex'} items-center justify-center text-center text-white`}
                  style={{ display: state.image ? 'none' : 'flex' }}
                >
                  <div>
                    <div className="text-4xl mb-2">🏛️</div>
                    <div className="text-lg font-medium">{state.name}</div>
                    <div className="text-sm opacity-75 mt-1">{state.description}</div>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-xl font-semibold text-cyan-300">
                  {state.name}
                </h3>
                <p className="text-gray-300 mb-4">{state.description}</p>
                <button
                  onClick={() => navigate(`/region/${regionKey}/${state.name}`)}
                  className="bg-cyan-600 text-white px-4 py-2 rounded hover:bg-cyan-700 transition"
                >
                  View Top Spots
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default RegionDetails;

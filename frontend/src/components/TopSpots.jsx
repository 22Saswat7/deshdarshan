import React from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { topSpots } from "../topSpotsData";

function TopSpots() {
  const { regionKey, stateName } = useParams();
  const navigate = useNavigate();

  const spots = topSpots[stateName] || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white px-4 pt-6 pb-12">
      <div className="max-w-6xl mx-auto">
        {/* Breadcrumb Navigation */}
        <nav className="mb-4 text-sm text-gray-300">
          <Link to="/" className="hover:underline">Home</Link> /
          <Link to={`/region/${regionKey}`} className="hover:underline capitalize ml-1">{regionKey}</Link> /
          <span className="capitalize ml-1">{stateName}</span>
        </nav>

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="mb-6 text-blue-300 underline underline-offset-2"
        >
          &larr; Back to States
        </button>

        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-white mb-8">
          Top Places in {stateName}
        </h2>

        {/* Top Spots */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {spots.length === 0 ? (
            <p className="text-gray-300">No top spots listed yet for {stateName}.</p>
          ) : (
            spots.map((spot) => (
              <div
                key={spot.name}
                className="bg-[#1e293b] text-white rounded-xl shadow-lg overflow-hidden hover:scale-[1.02] transition duration-200"
              >
                {/* Spot Image */}
                <div className="w-full h-48 overflow-hidden bg-gray-700">
                  {spot.image ? (
                    <>
                      <img 
                        src={spot.image}
                        alt={`${spot.name} - Top destination in ${stateName}`}
                        loading="lazy"
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          // Fallback to placeholder if the spot image fails to load
                          e.target.style.display = 'none';
                          e.target.nextElementSibling.style.display = 'flex';
                        }}
                      />
                      {/* Fallback placeholder */}
                      <div 
                        className="hidden w-full h-full bg-gradient-to-br from-blue-900 to-purple-900 items-center justify-center text-center"
                        style={{ display: 'none' }}
                      >
                        <div className="text-white">
                          <div className="text-3xl mb-2">🏞️</div>
                          <div className="text-sm opacity-75">{spot.name}</div>
                        </div>
                      </div>
                    </>
                  ) : (
                    // Default placeholder for spots without image property
                    <div className="w-full h-full bg-gradient-to-br from-blue-900 to-purple-900 flex items-center justify-center text-center">
                      <div className="text-white">
                        <div className="text-3xl mb-2">🏞️</div>
                        <div className="text-sm opacity-75">{spot.name}</div>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Content Container */}
                <div className="p-6 flex flex-col justify-between min-h-[200px]">
                  <div>
                    <h3 className="text-xl font-semibold text-blue-400 mb-2">{spot.name}</h3>
                    <p className="text-gray-300 mb-3">{spot.description}</p>
                    <ul className="list-disc list-inside text-blue-300 text-sm space-y-1 mb-4">
                      {spot.points.map((pt, idx) => (
                        <li key={idx}>{pt}</li>
                      ))}
                    </ul>
                  </div>

                  {/* View Details Button */}
                  <Link to={`/destination/${spot.name.toLowerCase()}`}>
                    <button className="mt-auto bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 transition duration-200">
                      View Details
                    </button>
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default TopSpots;

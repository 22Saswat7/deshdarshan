// src/pages/MyItinerary.jsx
import React from "react";

const MyItinerary = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-indigo-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-green-600 to-blue-600 px-8 py-8">
            <div className="flex items-center">
              <svg className="w-10 h-10 text-white mr-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <div>
                <h1 className="text-4xl font-bold text-white">My Itinerary</h1>
                <p className="text-green-100 mt-2">Plan and organize your travel adventures</p>
              </div>
            </div>
          </div>
          
          {/* Content Section */}
          <div className="p-8">
            <div className="text-center py-12">
              <div className="bg-blue-50 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Welcome to Your Personal Travel Hub!</h2>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                This is your protected itinerary space. Start planning your next adventure by exploring destinations and creating custom travel plans.
              </p>
              
              <div className="bg-gradient-to-r from-green-100 to-blue-100 rounded-xl p-6 max-w-lg mx-auto">
                <div className="flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-green-800 font-semibold">Authentication Successful!</span>
                </div>
                <p className="text-green-700 text-sm">
                  You are now logged in and can access all protected features of DeshDarshan.
                </p>
              </div>
              
              <div className="mt-8 flex gap-4 justify-center flex-wrap">
                <button className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-green-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg">
                  Create New Itinerary
                </button>
                <button className="bg-white border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transform hover:scale-105 transition-all duration-200 shadow-md">
                  Browse Destinations
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyItinerary;

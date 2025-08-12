// src/pages/MyItinerary.jsx

import React, { useState, useEffect } from "react";

const LOCAL_KEY = "deshdarshan_itineraries";

const MyItinerary = () => {
  const [itineraries, setItineraries] = useState([]);
  const [form, setForm] = useState({ destination: "", start: "", end: "", notes: "" });

  useEffect(() => {
    const saved = localStorage.getItem(LOCAL_KEY);
    if (saved) setItineraries(JSON.parse(saved));
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(itineraries));
  }, [itineraries]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (!form.destination || !form.start || !form.end) return;
    setItineraries([
      ...itineraries,
      { ...form, id: Date.now() }
    ]);
    setForm({ destination: "", start: "", end: "", notes: "" });
  };

  const handleDelete = (id) => {
    setItineraries(itineraries.filter(i => i.id !== id));
  };

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
            <form onSubmit={handleAdd} className="bg-gradient-to-br from-white via-blue-50 to-blue-100 rounded-2xl p-10 max-w-lg mx-auto mb-10 shadow-xl border border-blue-100">
              <h2 className="text-2xl font-extrabold text-gray-800 mb-6 flex items-center gap-2">
                <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
                Create New Itinerary
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input name="destination" value={form.destination} onChange={handleChange} placeholder="Destination" className="p-3 rounded-lg border border-blue-200 bg-white text-gray-800 shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition hover:border-blue-400" required />
                <input name="start" type="date" value={form.start} onChange={handleChange} className="p-3 rounded-lg border border-blue-200 bg-white text-gray-800 shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition hover:border-blue-400" required />
                <input name="end" type="date" value={form.end} onChange={handleChange} className="p-3 rounded-lg border border-blue-200 bg-white text-gray-800 shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition hover:border-blue-400" required />
                <input name="notes" value={form.notes} onChange={handleChange} placeholder="Notes (optional)" className="p-3 rounded-lg border border-blue-200 bg-white text-gray-800 shadow-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 outline-none transition hover:border-blue-400 md:col-span-2" />
              </div>
              <div className="my-6 border-t border-blue-100"></div>
              <button type="submit" className="mt-2 bg-gradient-to-r from-green-500 to-blue-500 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:from-green-600 hover:to-blue-600 hover:shadow-xl transform hover:scale-105 transition-all duration-200 w-full flex items-center justify-center gap-2">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>
                Add Itinerary
              </button>
            </form>
            <div className="max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Your Itineraries</h2>
              {itineraries.length === 0 ? (
                <p className="text-gray-500 text-center">No itineraries yet. Start by adding one above!</p>
              ) : (
                <ul className="space-y-4">
                  {itineraries.map(i => (
                    <li key={i.id} className="bg-white border border-blue-100 rounded-lg p-4 shadow flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                      <div>
                        <div className="font-semibold text-lg text-blue-700">{i.destination}</div>
                        <div className="text-sm text-gray-600">{i.start} to {i.end}</div>
                        {i.notes && <div className="text-xs text-gray-500 mt-1">{i.notes}</div>}
                      </div>
                      <button onClick={() => handleDelete(i.id)} className="bg-red-100 text-red-700 px-3 py-1 rounded hover:bg-red-200 font-semibold">Delete</button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyItinerary;

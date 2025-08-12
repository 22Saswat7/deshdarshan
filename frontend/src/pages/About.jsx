import React from "react";

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white px-4 py-10 flex items-center justify-center">
      <div className="max-w-2xl w-full bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-8 border border-white/10">
        <h1 className="text-4xl font-bold text-orange-400 mb-4 text-center">About DeshDarshan</h1>
        <p className="text-lg text-slate-200 mb-6 text-center">
          DeshDarshan is an AI-powered travel and itinerary platform designed to make exploring India seamless, personalized, and memorable. Our mission is to help travelers discover hidden gems, plan smarter, and experience the real vibe of every region.
        </p>
        <ul className="list-disc list-inside text-slate-100 space-y-2 mb-6">
          <li>Personalized AI travel assistant for instant help and recommendations</li>
          <li>Smart packing lists and itinerary planning</li>
          <li>Self-rental vehicle booking for true travel freedom</li>
          <li>Region and state-based destination discovery</li>
          <li>Modern, secure, and user-friendly experience</li>
        </ul>
        <div className="text-center text-slate-300 text-sm">
          <p>Made with ❤️ by the DeshDarshan Team</p>
          <p className="mt-2">Contact: <a href="mailto:your@email.com" className="text-cyan-400 underline">your@email.com</a></p>
        </div>
      </div>
    </div>
  );
}

import React from "react";

export default function Contact() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] flex items-center justify-center px-4 py-10">
      <div className="max-w-3xl w-full bg-white/10 backdrop-blur-md rounded-2xl shadow-xl p-8 flex flex-col md:flex-row items-center gap-10 border border-white/10">
        {/* Contact Info */}
        <div className="flex-1 space-y-7">
          <h1 className="text-4xl font-extrabold text-white mb-2">Contact Us</h1>
          <div className="flex items-center gap-4 text-lg text-slate-100">
            <span className="inline-flex items-center justify-center w-10 h-10 bg-orange-100/80 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-orange-500">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75v10.5A2.25 2.25 0 004.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75M2.25 6.75A2.25 2.25 0 014.5 4.5h15a2.25 2.25 0 012.25 2.25M2.25 6.75l9.72 7.29a2.25 2.25 0 002.56 0l9.72-7.29" />
              </svg>
            </span>
            <span className="font-semibold">+91 7763210343</span>
          </div>
          <div className="flex items-center gap-4 text-lg text-slate-100">
            <span className="inline-flex items-center justify-center w-10 h-10 bg-orange-100/80 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-orange-500">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5A2.25 2.25 0 0119.5 19.5h-15A2.25 2.25 0 012.25 17.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15A2.25 2.25 0 002.25 6.75m19.5 0l-9.72 7.29a2.25 2.25 0 01-2.56 0L2.25 6.75" />
              </svg>
            </span>
            <span className="font-semibold">explore@deshdarshan.in</span>
          </div>
          <div className="flex items-center gap-4 text-lg text-slate-100">
            <span className="inline-flex items-center justify-center w-10 h-10 bg-blue-100/80 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6 text-blue-600">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-7.5 19h-3v-8h3v8zm-1.5-9.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 9.268h-3v-4.604c0-1.099-.021-2.513-1.532-2.513-1.532 0-1.768 1.197-1.768 2.434v4.683h-3v-8h2.881v1.093h.041c.401-.761 1.379-1.563 2.841-1.563 3.039 0 3.6 2.001 3.6 4.6v3.87z"/>
              </svg>
            </span>
            <a href="https://linkedin.com/in/dummy-profile" target="_blank" rel="noopener noreferrer" className="font-semibold underline text-blue-300 hover:text-blue-400">LinkedIn</a>
          </div>
        </div>
        {/* Professional Illustration Section */}
        <div className="flex-1 flex flex-col items-center">
          <h2 className="text-3xl font-bold text-orange-300 mb-4">THANK YOU</h2>
          <div className="w-64 h-48 rounded-xl border border-orange-200 bg-orange-50 flex items-center justify-center">
            {/* Modern professional illustration: business handshake */}
            <svg width="120" height="90" viewBox="0 0 120 90" fill="none" xmlns="http://www.w3.org/2000/svg">
              <ellipse cx="60" cy="45" rx="58" ry="40" fill="#FDE68A" />
              <rect x="30" y="60" width="60" height="12" rx="6" fill="#F59E42" />
              <rect x="40" y="50" width="16" height="20" rx="8" fill="#FBBF24" />
              <rect x="64" y="50" width="16" height="20" rx="8" fill="#FBBF24" />
              <rect x="56" y="68" width="8" height="16" rx="4" fill="#F59E42" />
              <rect x="52" y="60" width="16" height="8" rx="4" fill="#FCD34D" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

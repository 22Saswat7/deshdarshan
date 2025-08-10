import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] fixed top-0 left-0 right-0 shadow z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-between p-4">
        <Link to="/" className="text-xl font-bold text-white">
          DeshDarshan
        </Link>
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white focus:outline-none"
          >
            ☰
          </button>
        </div>
        <nav className="hidden md:flex space-x-6 items-center">
          <Link to="/" className="text-white hover:underline">
            Home
          </Link>
          <Link to="/region/east" className="text-white hover:underline">
            Regions
          </Link>
          <Link to="/about" className="text-white hover:underline">
            About
          </Link>
          <Link to="/contact" className="text-white hover:underline">
            Contact
          </Link>
          <Link to="/my-itinerary" className="text-white hover:underline">
            My Itinerary
          </Link>
          {user ? (
            <>
              <span className="text-white ml-4">Hi, {user.name || user.email}</span>
              <button
                onClick={() => { logout(); navigate("/login"); }}
                className="ml-4 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
              >
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="ml-4 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded">
              Login
            </Link>
          )}
        </nav>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] shadow">
          <nav className="flex flex-col space-y-2 p-4">
            <Link to="/" className="text-white" onClick={() => setIsOpen(false)}>
              Home
            </Link>
            <Link to="/region/east" className="text-white" onClick={() => setIsOpen(false)}>
              Regions
            </Link>
            <Link to="/about" className="text-white" onClick={() => setIsOpen(false)}>
              About
            </Link>
            <Link to="/contact" className="text-white" onClick={() => setIsOpen(false)}>
              Contact
            </Link>
            <Link to="/my-itinerary" className="text-white" onClick={() => setIsOpen(false)}>
              My Itinerary
            </Link>
            {user ? (
              <>
                <span className="text-white mt-2">Hi, {user.name || user.email}</span>
                <button
                  onClick={() => { setIsOpen(false); logout(); navigate("/login"); }}
                  className="mt-2 bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link to="/login" className="mt-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded" onClick={() => setIsOpen(false)}>
                Login
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}

export default Header;

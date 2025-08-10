// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components
import Header from "./components/Header";
import HomePage from "./components/HomePage";
import RegionDetails from "./components/RegionDetails";
import TopSpots from "./components/TopSpots";
import AIAssistantPanel from "./components/AIAssistantPanelNew";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import MyItinerary from "./pages/MyItinerary";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";

// Pages
import DestinationDetails from "./pages/DestinationDetails";
import ThankYou from "./pages/ThankYou";
import ChooseVehicle from "./pages/ChooseVehicle";
import BookingSuccess from "./pages/BookingSuccess";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <div className="pt-20">
        <Routes>
          {/* Home page */}
          <Route path="/" element={<HomePage />} />

          {/* Region Details: like /region/east */}
          <Route path="/region/:regionKey" element={<RegionDetails />} />

          {/* State-level top spots: like /region/east/odisha */}
          <Route path="/region/:regionKey/:stateName" element={<TopSpots />} />

          {/* Destination details: like /destination/puri */}
          <Route path="/destination/:placeName" element={<DestinationDetails />} />
          
          {/* Vehicle selection page */}
          <Route path="/choose-vehicle" element={<ChooseVehicle />} />

          {/* Thank You confirmation page */}
          <Route path="/thank-you" element={<ThankYou />} />

          {/* Booking Success page after payment */}
          <Route path="/booking-success" element={<BookingSuccess />} />

          {/* Auth pages */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Protected page */}
          <Route path="/my-itinerary" element={
            <ProtectedRoute>
              <MyItinerary />
            </ProtectedRoute>
          } />

          {/* Static placeholder pages */}
          <Route path="/about" element={<div className="text-center mt-10">About Page Coming Soon</div>} />
          <Route path="/contact" element={<div className="text-center mt-10">Contact Page Coming Soon</div>} />
        </Routes>
        </div>
        {/* AI Assistant Panel - Available on all pages */}
        <AIAssistantPanel />
      </Router>
    </AuthProvider>
  );
}

export default App;

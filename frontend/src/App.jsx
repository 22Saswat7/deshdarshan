// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";

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
import About from "./pages/About";
import Contact from "./pages/Contact";

function usePath() {
  const location = useLocation();
  return location.pathname;
}

function MainApp() {
  const [aiOpen, setAiOpen] = React.useState(false);
  const path = usePath();
  const hideAI = path === "/login" || path === "/signup";
  return (
    <>
      <Header />
      <div className="pt-20">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/region/:regionKey" element={<RegionDetails />} />
          <Route path="/region/:regionKey/:stateName" element={<TopSpots />} />
          <Route path="/destination/:placeName" element={<DestinationDetails />} />
          <Route path="/choose-vehicle" element={<ChooseVehicle />} />
          <Route path="/thank-you" element={<ThankYou />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/my-itinerary" element={<ProtectedRoute><MyItinerary /></ProtectedRoute>} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
      {/* AI Assistant trigger button and panel only if not on login/signup */}
      {!hideAI && (
        <>
          <button
            onClick={() => setAiOpen(true)}
            className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full shadow-lg hover:scale-105 transition-all duration-200 font-bold text-lg"
          >
            🤖 Open AI Assistant
          </button>
          {aiOpen && <AIAssistantPanel isOpen={aiOpen} setIsOpen={setAiOpen} />}
        </>
      )}
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <MainApp />
      </Router>
    </AuthProvider>
  );
}

export default App;

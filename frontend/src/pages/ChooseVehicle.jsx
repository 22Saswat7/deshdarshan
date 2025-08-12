
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

// Vehicle data with numeric price for calculation
const vehicles = [
  {
    name: "Bike",
    type: "Standard Bike",
    price: 500,
    image: null,
  },
  {
    name: "Bike",
    type: "Scooty",
    price: 300,
    image: null,
  },
  {
    name: "Car",
    type: "Hatchback",
    price: 800,
    image: null,
  },
  {
    name: "Car",
    type: "Sedan",
    price: 1000,
    image: null,
  },
  {
    name: "Car",
    type: "Luxury SUV",
    price: 2000,
    image: null,
  },
];

export default function ChooseVehicle() {
  const navigate = useNavigate();
  const location = useLocation();
  const bookingData = location.state || {};

  const handleVehicleSelect = (selectedVehicle) => {
    // Add vehicle info and update total
    const updatedBooking = {
      ...bookingData,
      selectedVehicle,
      total: (bookingData.total || 0) + selectedVehicle.price,
    };
    navigate("/thank-you", { state: updatedBooking });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white px-4 py-10">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">Choose Your Ride</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {vehicles.map((v, index) => (
            <div
              key={index}
              className="bg-white text-gray-900 rounded-xl shadow-md p-6 hover:scale-105 cursor-pointer transition"
              onClick={() => handleVehicleSelect(v)}
            >
              <h3 className="text-xl font-semibold mb-2">{v.type}</h3>
              <p className="text-sm text-gray-600 mb-1">Category: {v.name}</p>
              <p className="text-lg font-bold text-blue-700">₹{v.price} / 12 hrs</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
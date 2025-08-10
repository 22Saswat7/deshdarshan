import React from "react";
import { useNavigate } from "react-router-dom";

const vehicles = [
  {
    type: "Car",
    category: "Hatchback",
    price: "₹800 / 12 hrs",
  },
  {
    type: "Car",
    category: "Sedan",
    price: "₹1000 / 12 hrs",
  },
  {
    type: "Car",
    category: "Premium Sedan",
    price: "₹1500 / 12 hrs",
  },
  {
    type: "Bike",
    category: "Scooty",
    price: "₹300 / 12 hrs",
  },
  {
    type: "Bike",
    category: "Standard Bike",
    price: "₹500 / 12 hrs",
  },
];

export default function ChooseVehicle() {
  const navigate = useNavigate();

  const handleVehicleSelect = (selectedVehicle) => {
    console.log("Selected vehicle:", selectedVehicle);
    // You can store this in state/context if needed
    navigate("/thank-you");
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
              <h3 className="text-xl font-semibold mb-2">{v.category}</h3>
              <p className="text-sm text-gray-600 mb-1">Type: {v.type}</p>
              <p className="text-lg font-bold text-blue-700">{v.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
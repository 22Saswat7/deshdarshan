import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { topSpots } from "../topSpotsData";
import "react-toastify/dist/ReactToastify.css";
import PriceDisplay from "../components/PriceDisplay";
import PaymentButton from "../components/PaymentButtonNew";

function DestinationDetails() {
  const { placeName } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    date: "",
    groupSize: 1,
  });
  const [addVehicle, setAddVehicle] = useState(false);

  // Find the selected destination
  let selectedSpot = null;
  for (const stateSpots of Object.values(topSpots)) {
    const found = stateSpots.find(
      (spot) => spot.name.toLowerCase() === placeName.toLowerCase()
    );
    if (found) {
      selectedSpot = found;
      break;
    }
  }

  if (!selectedSpot) {
    return (
      <div className="text-center text-red-500 mt-10 text-lg font-semibold">
        ❌ Place not found.
      </div>
    );
  }

  const pricePerPerson = 4999;
  const vehicleCost = addVehicle ? 2500 : 0;
  const subtotal = pricePerPerson * formData.groupSize + vehicleCost;
  const tax = Math.round(subtotal * 0.1);
  const total = subtotal + tax;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "groupSize" ? parseInt(value || 1) : value,
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white px-4 py-10">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 text-cyan-400 hover:underline font-medium"
      >
        ← Back
      </button>

      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header with Image and Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
          {/* Left: Image */}
          <img
            src={selectedSpot.image}
            alt={selectedSpot.name}
            className="rounded-xl w-full h-[500px] object-cover shadow-lg border border-white/10"
          />

          {/* Right: Pricing Details */}
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">{selectedSpot.name}</h1>
              <p className="text-gray-300 text-lg">{selectedSpot.description}</p>
            </div>
            
            {/* Pricing Information */}
            {selectedSpot.pricing && (
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <h3 className="text-xl font-semibold text-cyan-400 mb-4">Pricing Details</h3>
                <PriceDisplay pricing={selectedSpot.pricing} view="detailed" />
              </div>
            )}
          </div>
        </div>

        {/* Booking Form Section */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl shadow-xl p-6 space-y-4 border border-white/10">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold text-orange-400">₹{pricePerPerson}</h2>
              <p className="text-yellow-300 font-medium">⭐ 5.0 (4)</p>
            </div>
            <hr className="border-gray-500" />

          <h3 className="text-xl font-semibold">Traveler Info</h3>
          <div className="space-y-3">
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              className="w-full bg-white/20 text-white placeholder-gray-300 border border-white/30 p-2 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
              onChange={handleChange}
              value={formData.fullName}
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone"
              className="w-full bg-white/20 text-white placeholder-gray-300 border border-white/30 p-2 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
              onChange={handleChange}
              value={formData.phone}
            />
            <div className="flex gap-2">
              <input
                type="date"
                name="date"
                className="w-1/2 bg-white/20 text-white border border-white/30 p-2 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
                onChange={handleChange}
                value={formData.date}
              />
              <input
                type="number"
                name="groupSize"
                placeholder="Group Size"
                min="1"
                className="w-1/2 bg-white/20 text-white placeholder-gray-300 border border-white/30 p-2 rounded focus:outline-none focus:ring-2 focus:ring-cyan-500"
                onChange={handleChange}
                value={formData.groupSize}
              />
            </div>
          </div>

          {/* Vehicle Add-on */}
          <div className="mt-4">
            <label className="flex items-center gap-2 text-sm text-white cursor-pointer">
              <input
                type="checkbox"
                checked={addVehicle}
                onChange={() => setAddVehicle(!addVehicle)}
              />
              Add a self-rental vehicle to feel the real vibe of the trip
            </label>
          </div>

          {/* Price Summary */}
          <div className="text-white space-y-1 mt-4 text-sm">
            <div className="flex justify-between">
              <span>₹{pricePerPerson} × {formData.groupSize} Person</span>
              <span>₹{pricePerPerson * formData.groupSize}</span>
            </div>
            {addVehicle && (
              <div className="flex justify-between">
                <span>Vehicle Rental</span>
                <span>₹{vehicleCost}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Taxes</span>
              <span>₹{tax}</span>
            </div>
            <div className="flex justify-between font-bold text-lg text-green-300 border-t border-white/30 pt-2">
              <span>Total</span>
              <span>₹{total}</span>
            </div>
          </div>

          <PaymentButton
            amount={total}
            description={`DeshDarshan - ${selectedSpot.name} Travel Package`}
            customerDetails={{
              fullName: formData.fullName,
              phone: formData.phone,
              email: formData.email || ''
            }}
            bookingDetails={{
              destination: selectedSpot.name,
              image: selectedSpot.image,
              date: formData.date,
              groupSize: formData.groupSize,
              pricePerPerson,
              vehicleCost,
              tax,
              total,
              addVehicle
            }}
            disabled={!formData.fullName || !formData.phone || !formData.date}
            className="mt-4"
          >
            Pay ₹{total} & Book Now
          </PaymentButton>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DestinationDetails;

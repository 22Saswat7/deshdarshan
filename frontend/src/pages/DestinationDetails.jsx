import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { topSpots } from "../topSpotsData";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
  const tax = 249;
  const total = pricePerPerson * formData.groupSize + tax;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "groupSize" ? parseInt(value || 1) : value,
    }));
  };

  const handleBooking = () => {
    const { fullName, phone, date } = formData;

    if (!fullName || !phone || !date) {
      toast.error("⚠️ Please fill in all fields before booking.");
      return;
    }

    toast.success(`✅ Booking confirmed for ${selectedSpot.name}!`);

    const bookingData = {
      destination: selectedSpot.name,
      image: selectedSpot.image,
      ...formData,
      price: pricePerPerson,
      tax: tax,
      total: total,
    };

    setTimeout(() => {
      if (addVehicle) {
        navigate("/choose-vehicle", { state: bookingData });
      } else {
        navigate("/thank-you", { state: bookingData });
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white px-4 py-10">
      <button
        onClick={() => navigate(-1)}
        className="mb-6 text-cyan-400 hover:underline font-medium"
      >
        ← Back
      </button>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        {/* Left: Image */}
        <img
          src={selectedSpot.image}
          alt={selectedSpot.name}
          className="rounded-xl w-full h-[500px] object-cover shadow-lg border border-white/10"
        />

        {/* Right: Booking Form */}
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
            <div className="flex justify-between">
              <span>Taxes</span>
              <span>₹{tax}</span>
            </div>
            <div className="flex justify-between font-bold text-lg text-green-300 border-t border-white/30 pt-2">
              <span>Total</span>
              <span>₹{total}</span>
            </div>
          </div>

          <button
            onClick={handleBooking}
            className="w-full mt-4 bg-orange-500 hover:bg-orange-600 text-white py-2 rounded font-semibold transition-all duration-200"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default DestinationDetails;

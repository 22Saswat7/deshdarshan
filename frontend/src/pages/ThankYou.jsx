import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

function ThankYou() {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white">
        <h1 className="text-3xl font-semibold mb-4">⚠️ No booking data found.</h1>
        <button
          onClick={() => navigate("/")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition duration-200"
        >
          Go Home
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white px-4 py-10">
      <div className="max-w-4xl mx-auto bg-[#1e293b] shadow-lg rounded-xl overflow-hidden">
        <div className="p-6">
          <h1 className="text-3xl font-bold text-green-400 mb-6 text-center">
            🎉 Booking Confirmed!
          </h1>

          <div className="grid md:grid-cols-2 gap-6 items-start">
            {/* Image */}
            {state.image ? (
              <img
                src={state.image}
                alt={state.destination}
                className="rounded-xl w-full h-72 object-cover border border-gray-600"
              />
            ) : (
              <div className="w-full h-72 bg-gray-700 rounded-xl flex items-center justify-center">
                <p>No Image</p>
              </div>
            )}

            {/* Booking Info */}
            <div className="space-y-3 text-gray-100">
              <h2 className="text-2xl font-semibold text-orange-400">
                {state.destination || state.placeName}
              </h2>
              {state.fullName && <p><strong>Name:</strong> {state.fullName}</p>}
              {state.phone && <p><strong>Phone:</strong> {state.phone}</p>}
              {state.date && <p><strong>Date:</strong> {state.date}</p>}
              {state.groupSize && <p><strong>Group Size:</strong> {state.groupSize}</p>}
              {state.price && <p><strong>Price per Person:</strong> ₹{state.price}</p>}
              {state.tax && <p><strong>Taxes:</strong> ₹{state.tax}</p>}
              {state.total && (
                <p className="text-lg font-bold text-green-400">
                  Total Paid: ₹{state.total}
                </p>
              )}

              {/* Vehicle Info */}
              {state.selectedVehicle && (
                <>
                  <div className="mt-4 p-4 bg-gray-800 rounded-lg border border-gray-600">
                    <h3 className="text-xl font-semibold text-cyan-400 mb-2">
                      🚗 Vehicle Rental Added
                    </h3>
                    <p><strong>Category:</strong> {state.selectedVehicle.name}</p>
                    <p><strong>Type:</strong> {state.selectedVehicle.type}</p>
                    <p><strong>Price:</strong> ₹{state.selectedVehicle.price} / 12 hours</p>
                  </div>
                  <p className="text-orange-500 font-semibold mt-2">
                    ⚠ You have to pay an extra ₹{state.selectedVehicle.price} for the self-rental vehicle during hotel check-in.
                  </p>
                </>
              )}
            </div>
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={() => navigate("/")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition duration-200"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ThankYou;
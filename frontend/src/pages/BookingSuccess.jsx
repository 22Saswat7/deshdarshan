/**
 * BookingSuccess Component
 * Thank you page after successful payment
 */

import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { formatPrice } from '../pricingData';

const BookingSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const { booking, customerDetails, bookingDetails } = location.state || {};

  // Redirect if no booking data
  if (!booking) {
    navigate('/');
    return null;
  }

  const handlePrintBooking = () => {
    window.print();
  };

  const handleDownloadBooking = () => {
    const bookingData = {
      booking_id: booking.booking_id,
      payment_id: booking.payment_id,
      customer: customerDetails,
      booking: bookingDetails,
      status: booking.status,
      confirmed_at: booking.confirmed_at
    };
    
    const dataStr = JSON.stringify(bookingData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `DeshDarshan_Booking_${booking.booking_id}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] text-white px-4 py-10">
      <div className="max-w-4xl mx-auto">
        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="w-24 h-24 mx-auto mb-6 bg-green-500 rounded-full flex items-center justify-center">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          <h1 className="text-4xl font-bold text-green-400 mb-2">Booking Confirmed!</h1>
          <p className="text-xl text-gray-300">Thank you for choosing DeshDarshan</p>
        </div>

        {/* Booking Details Card */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/10 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column - Booking Info */}
            <div>
              <h2 className="text-2xl font-semibold text-cyan-400 mb-6">Booking Details</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-white/20">
                  <span className="text-gray-300">Booking ID:</span>
                  <span className="font-mono text-orange-400">{booking.booking_id}</span>
                </div>
                
                <div className="flex justify-between items-center py-2 border-b border-white/20">
                  <span className="text-gray-300">Payment ID:</span>
                  <span className="font-mono text-green-400">{booking.payment_id}</span>
                </div>
                
                <div className="flex justify-between items-center py-2 border-b border-white/20">
                  <span className="text-gray-300">Status:</span>
                  <span className="px-3 py-1 bg-green-500 text-white rounded-full text-sm">
                    {booking.status?.toUpperCase() || 'CONFIRMED'}
                  </span>
                </div>
                
                <div className="flex justify-between items-center py-2 border-b border-white/20">
                  <span className="text-gray-300">Booking Date:</span>
                  <span className="text-white">
                    {new Date(booking.confirmed_at).toLocaleDateString('en-IN', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                </div>

                {bookingDetails?.destination && (
                  <div className="flex justify-between items-center py-2 border-b border-white/20">
                    <span className="text-gray-300">Destination:</span>
                    <span className="text-cyan-400 font-semibold">{bookingDetails.destination}</span>
                  </div>
                )}

                {bookingDetails?.date && (
                  <div className="flex justify-between items-center py-2 border-b border-white/20">
                    <span className="text-gray-300">Travel Date:</span>
                    <span className="text-white">{bookingDetails.date}</span>
                  </div>
                )}

                {bookingDetails?.groupSize && (
                  <div className="flex justify-between items-center py-2 border-b border-white/20">
                    <span className="text-gray-300">Group Size:</span>
                    <span className="text-white">{bookingDetails.groupSize} person(s)</span>
                  </div>
                )}
              </div>
            </div>

            {/* Right Column - Customer Info */}
            <div>
              <h2 className="text-2xl font-semibold text-cyan-400 mb-6">Customer Information</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-white/20">
                  <span className="text-gray-300">Name:</span>
                  <span className="text-white">{customerDetails?.fullName}</span>
                </div>
                
                <div className="flex justify-between items-center py-2 border-b border-white/20">
                  <span className="text-gray-300">Phone:</span>
                  <span className="text-white">{customerDetails?.phone}</span>
                </div>
                
                {customerDetails?.email && (
                  <div className="flex justify-between items-center py-2 border-b border-white/20">
                    <span className="text-gray-300">Email:</span>
                    <span className="text-white">{customerDetails.email}</span>
                  </div>
                )}

                {bookingDetails?.total && (
                  <div className="flex justify-between items-center py-3 border-b border-white/20 mt-6">
                    <span className="text-xl font-semibold text-gray-300">Total Amount:</span>
                    <span className="text-2xl font-bold text-green-400">
                      {formatPrice(bookingDetails.total)}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={handlePrintBooking}
            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            Print Booking
          </button>
          
          <button
            onClick={handleDownloadBooking}
            className="px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Download Details
          </button>
          
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-semibold transition-all duration-200 flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Back to Home
          </button>
        </div>

        {/* Important Information */}
        <div className="mt-8 bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-yellow-400 mb-3">Important Information</h3>
          <ul className="text-sm text-gray-300 space-y-2">
            <li>• Please save your booking ID for future reference</li>
            <li>• You will receive a confirmation email shortly</li>
            <li>• For any queries, contact our support team</li>
            <li>• Carry a valid ID proof during your travel</li>
            <li>• Check weather conditions before your trip</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BookingSuccess;

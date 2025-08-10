/**
 * PaymentButton Component
 * Handles Razorpay payment integration
 */

import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { createPaymentOrder, initiatePayment } from '../services/paymentService';

const PaymentButton = ({ 
  amount, 
  description, 
  customerDetails, 
  bookingDetails,
  className = "",
  disabled = false,
  children = "Pay Now"
}) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  const handlePayment = async () => {
    if (!amount || amount <= 0) {
      toast.error('Invalid payment amount');
      return;
    }

    if (!customerDetails?.fullName || !customerDetails?.phone) {
      toast.error('Please fill in all required details');
      return;
    }

    setIsProcessing(true);

    try {
      // Step 1: Create order on backend
      const orderData = {
        amount: amount,
        description: description || 'DeshDarshan Travel Booking',
        customerDetails: customerDetails
      };

      toast.info('Creating payment order...', { autoClose: 1000 });
      const orderResponse = await createPaymentOrder(orderData);

      if (!orderResponse.success) {
        throw new Error(orderResponse.message || 'Failed to create payment order');
      }

      // Step 2: Configure Razorpay options
      const paymentOptions = {
        key: orderResponse.key_id,
        amount: orderResponse.amount,
        currency: orderResponse.currency,
        name: 'DeshDarshan',
        description: description || 'Travel Booking Payment',
        order_id: orderResponse.order_id,
        prefill: {
          name: customerDetails.fullName,
          contact: customerDetails.phone,
          email: customerDetails.email || ''
        },
        theme: {
          color: '#f97316' // Orange color matching the app theme
        },
        notes: {
          booking_type: 'travel_package',
          destination: bookingDetails?.destination || 'Unknown'
        }
      };

      // Step 3: Initiate payment
      toast.info('Opening Razorpay checkout...', { autoClose: 1000 });
      const paymentResult = await initiatePayment(paymentOptions, bookingDetails);

      if (paymentResult.success) {
        toast.success('Payment successful! Booking confirmed.');
        
        // Redirect to thank you page with booking details
        navigate('/booking-success', {
          state: {
            booking: paymentResult.booking,
            payment: paymentResult.payment,
            customerDetails: customerDetails,
            bookingDetails: bookingDetails
          }
        });
      } else {
        throw new Error(paymentResult.error || 'Payment failed');
      }

    } catch (error) {
      console.error('Payment error:', error);
      
      if (error.cancelled) {
        toast.info('Payment cancelled');
      } else {
        toast.error(error.message || error.error || 'Payment failed. Please try again.');
      }
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <button
      onClick={handlePayment}
      disabled={disabled || isProcessing}
      className={`
        w-full py-3 px-6 rounded-lg font-semibold text-white
        transition-all duration-200 transform
        ${isProcessing 
          ? 'bg-gray-400 cursor-not-allowed' 
          : 'bg-orange-500 hover:bg-orange-600 hover:scale-105 active:scale-95'
        }
        ${disabled ? 'bg-gray-400 cursor-not-allowed' : ''}
        ${className}
      `}
    >
      {isProcessing ? (
        <div className="flex items-center justify-center gap-2">
          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          Processing Payment...
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export default PaymentButton;

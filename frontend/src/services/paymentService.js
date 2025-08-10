/**
 * Payment Service for DeshDarshan
 * Handles Razorpay payment integration on frontend
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

/**
 * Creates a payment order on the backend
 * @param {Object} orderData - Order details
 * @param {number} orderData.amount - Amount in rupees
 * @param {string} orderData.description - Order description
 * @param {Object} orderData.customerDetails - Customer information
 * @returns {Promise<Object>} Order response from backend
 */
export const createPaymentOrder = async (orderData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/payment/create-order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to create payment order');
    }

    return data;
  } catch (error) {
    console.error('Error creating payment order:', error);
    throw error;
  }
};

/**
 * Verifies payment with the backend
 * @param {Object} paymentData - Payment verification data
 * @param {string} paymentData.razorpay_order_id - Razorpay order ID
 * @param {string} paymentData.razorpay_payment_id - Razorpay payment ID
 * @param {string} paymentData.razorpay_signature - Razorpay signature
 * @param {Object} paymentData.bookingDetails - Booking details
 * @returns {Promise<Object>} Verification response from backend
 */
export const verifyPayment = async (paymentData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/payment/verify-payment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paymentData),
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Payment verification failed');
    }

    return data;
  } catch (error) {
    console.error('Error verifying payment:', error);
    throw error;
  }
};

/**
 * Gets Razorpay configuration from backend
 * @returns {Promise<Object>} Razorpay config
 */
export const getPaymentConfig = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/payment/config`);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch payment config');
    }

    return data;
  } catch (error) {
    console.error('Error fetching payment config:', error);
    throw error;
  }
};

/**
 * Loads Razorpay script dynamically
 * @returns {Promise<void>}
 */
export const loadRazorpayScript = () => {
  return new Promise((resolve, reject) => {
    // Check if script is already loaded
    if (window.Razorpay) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve();
    script.onerror = () => reject(new Error('Failed to load Razorpay script'));
    document.body.appendChild(script);
  });
};

/**
 * Initiates Razorpay payment process
 * @param {Object} paymentOptions - Payment options for Razorpay
 * @param {Object} bookingDetails - Booking details to pass to verification
 * @returns {Promise<Object>} Payment result
 */
export const initiatePayment = async (paymentOptions, bookingDetails) => {
  try {
    // Load Razorpay script
    await loadRazorpayScript();

    return new Promise((resolve, reject) => {
      const options = {
        ...paymentOptions,
        handler: async function (response) {
          try {
            // Verify payment with backend
            const verificationData = {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              bookingDetails: bookingDetails
            };

            const verificationResult = await verifyPayment(verificationData);
            resolve({
              success: true,
              payment: response,
              booking: verificationResult.booking
            });
          } catch (error) {
            reject({
              success: false,
              error: error.message,
              payment: response
            });
          }
        },
        modal: {
          ondismiss: function() {
            reject({
              success: false,
              error: 'Payment cancelled by user',
              cancelled: true
            });
          }
        }
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    });
  } catch (error) {
    throw {
      success: false,
      error: error.message || 'Failed to initiate payment'
    };
  }
};

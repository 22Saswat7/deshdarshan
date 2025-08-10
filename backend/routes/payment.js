/**
 * Payment Routes for DeshDarshan
 * Handles Razorpay payment integration
 */

const express = require('express');
const Razorpay = require('razorpay');
const crypto = require('crypto');
const router = express.Router();

// Initialize Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

/**
 * POST /api/payment/create-order
 * Creates a Razorpay order for payment
 */
router.post('/create-order', async (req, res) => {
  try {
    const { amount, description, customerDetails } = req.body;

    // Validate input
    if (!amount || amount <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Invalid amount provided'
      });
    }

    // Convert amount to paise (Razorpay expects amount in smallest currency unit)
    const amountInPaise = Math.round(amount * 100);

    const options = {
      amount: amountInPaise,
      currency: 'INR',
      receipt: `receipt_${Date.now()}`,
      notes: {
        description: description || 'DeshDarshan Travel Booking',
        customer_name: customerDetails?.name || 'Guest',
        customer_phone: customerDetails?.phone || '',
        booking_type: 'travel_package'
      }
    };

    const order = await razorpay.orders.create(options);

    res.status(200).json({
      success: true,
      order_id: order.id,
      amount: order.amount,
      currency: order.currency,
      key_id: process.env.RAZORPAY_KEY_ID,
      order: order
    });

  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create payment order',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

/**
 * POST /api/payment/verify-payment
 * Verifies the payment signature and confirms the booking
 */
router.post('/verify-payment', async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      bookingDetails
    } = req.body;

    // Validate required fields
    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: 'Missing payment verification parameters'
      });
    }

    // Generate expected signature
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    // Verify signature
    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: 'Payment verification failed - Invalid signature'
      });
    }

    // Payment verified successfully
    // Here you would typically save the booking to database
    const bookingConfirmation = {
      booking_id: `BOOKING_${Date.now()}`,
      payment_id: razorpay_payment_id,
      order_id: razorpay_order_id,
      status: 'confirmed',
      confirmed_at: new Date().toISOString(),
      booking_details: bookingDetails
    };

    // Log successful payment (in production, save to database)
    console.log('Payment verified successfully:', {
      payment_id: razorpay_payment_id,
      order_id: razorpay_order_id,
      booking_id: bookingConfirmation.booking_id
    });

    res.status(200).json({
      success: true,
      message: 'Payment verified successfully',
      booking: bookingConfirmation
    });

  } catch (error) {
    console.error('Error verifying payment:', error);
    res.status(500).json({
      success: false,
      message: 'Payment verification failed',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Internal server error'
    });
  }
});

/**
 * GET /api/payment/config
 * Returns Razorpay configuration for frontend
 */
router.get('/config', (req, res) => {
  try {
    res.status(200).json({
      success: true,
      key_id: process.env.RAZORPAY_KEY_ID,
      currency: 'INR'
    });
  } catch (error) {
    console.error('Error fetching payment config:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch payment configuration'
    });
  }
});

module.exports = router;

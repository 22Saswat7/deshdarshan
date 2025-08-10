# Razorpay Payment Integration Setup Guide

## 🔧 Setting Up Razorpay for DeshDarshan

### Step 1: Create Razorpay Account
1. Visit [Razorpay Dashboard](https://dashboard.razorpay.com/) and sign up
2. Complete the business verification process
3. Navigate to **Settings** → **API Keys**

### Step 2: Get API Keys
1. Generate your **Key ID** and **Key Secret**
2. For testing, use **Test Mode** keys
3. For production, switch to **Live Mode** keys

### Step 3: Update Environment Variables
Update the `.env` file in the root directory:

```env
# Razorpay Configuration
RAZORPAY_KEY_ID=rzp_test_your_actual_key_id_here
RAZORPAY_KEY_SECRET=your_actual_secret_key_here
```

### Step 4: Configure Webhooks (Optional)
1. Go to **Settings** → **Webhooks**
2. Add webhook URL: `https://your-domain.com/api/payment/webhook`
3. Select events: `payment.captured`, `payment.failed`

## 🔒 Security Notes

- **Never commit real credentials** to version control
- Use **test keys** during development
- Keep **secret keys** secure and never expose them in frontend code
- Always verify payments on your backend

## 🧪 Testing Payment Flow

### Test Card Details
Use these Razorpay test card numbers:

**Successful Payments:**
- Card: `4111 1111 1111 1111`
- CVV: Any 3 digits
- Expiry: Any future date

**Failed Payments:**
- Card: `4000 0000 0000 0002`
- CVV: Any 3 digits
- Expiry: Any future date

### Test UPI
- UPI ID: `success@razorpay`
- PIN: Any 4 digits

## 📱 Payment Flow in DeshDarshan

1. **User fills booking form** in DestinationDetails page
2. **Clicks "Pay & Book Now"** button
3. **Backend creates Razorpay order** with amount in paise
4. **Frontend opens Razorpay checkout** modal
5. **User completes payment** using test/real credentials
6. **Backend verifies payment signature** for security
7. **User redirected to BookingSuccess** page with confirmation

## 🛠️ API Endpoints

### Create Order
```
POST /api/payment/create-order
Content-Type: application/json

{
  "amount": 4999,
  "description": "DeshDarshan - Puri Travel Package",
  "customerDetails": {
    "name": "John Doe",
    "phone": "9876543210"
  }
}
```

### Verify Payment
```
POST /api/payment/verify-payment
Content-Type: application/json

{
  "razorpay_order_id": "order_xyz",
  "razorpay_payment_id": "pay_abc",
  "razorpay_signature": "signature_hash",
  "bookingDetails": {...}
}
```

## 🚨 Important Notes

1. **Amount Conversion**: Razorpay expects amounts in **paise** (₹1 = 100 paise)
2. **Signature Verification**: Always verify payment signatures on backend
3. **Error Handling**: Handle payment failures gracefully with retry options
4. **User Experience**: Show loading states and clear error messages

## 🔄 Development vs Production

### Development (Test Mode)
- Use test API keys
- Payments are simulated
- No real money is charged
- Test cards always work

### Production (Live Mode)
- Use live API keys
- Real payments are processed
- Money is actually charged
- KYC verification required

## 📞 Support

For Razorpay integration issues:
- Documentation: [Razorpay Docs](https://razorpay.com/docs/)
- Support: [Razorpay Support](https://razorpay.com/support/)
- Test Cards: [Test Card Numbers](https://razorpay.com/docs/payments/payments/test-cards/)

---

**Remember**: Always test thoroughly before going live! 🚀

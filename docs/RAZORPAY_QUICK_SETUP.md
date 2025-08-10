# 🔑 RAZORPAY API SETUP GUIDE

## ⚡ Quick Setup (5 minutes)

### Step 1: Create Razorpay Account
1. Go to: [https://dashboard.razorpay.com/signup](https://dashboard.razorpay.com/signup)
2. Sign up with your email/phone
3. Verify your email/phone

### Step 2: Get Test API Keys
1. After login, go to **Settings** → **API Keys**
2. Click **Generate Test Keys**
3. Copy your **Key ID** and **Key Secret**

### Step 3: Update Your .env File
Open the `.env` file in your project root and replace:

```env
# Replace these with your actual Razorpay test keys
RAZORPAY_KEY_ID=rzp_test_your_actual_key_id_here
RAZORPAY_KEY_SECRET=your_actual_secret_key_here
```

### Step 4: Restart Backend Server
```bash
cd backend
npm start
```

## 🧪 Test Payment

### Test Card Numbers
- **Success**: `4111 1111 1111 1111`
- **Failure**: `4000 0000 0000 0002`
- **CVV**: Any 3 digits
- **Expiry**: Any future date

### Test UPI
- **UPI ID**: `success@razorpay`
- **PIN**: Any 4 digits

## 🎯 What Happens After Setup

1. **Real Razorpay Modal** will open when you click "Pay & Book Now"
2. **Test payments** work with the test card numbers above
3. **Payment verification** happens on your backend
4. **Booking confirmation** page shows real payment details

## 🚨 Important Notes

- **Test Mode**: No real money is charged
- **Live Mode**: For production, get live keys after KYC
- **Security**: Never commit real keys to version control
- **Backend**: Must restart after updating .env

## 📞 Need Help?

- Razorpay Docs: [https://razorpay.com/docs/](https://razorpay.com/docs/)
- Test Cards: [https://razorpay.com/docs/payments/payments/test-cards/](https://razorpay.com/docs/payments/payments/test-cards/)

---

**Once you add your API keys, the payment integration will work perfectly! 🚀**

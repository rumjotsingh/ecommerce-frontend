# Quick Start Guide - New Features

## 🚀 Getting Started with New Features

### Prerequisites
- Backend server running at: `https://ecommercebackend-mrt6.onrender.com`
- User account created and logged in
- Products available in the store

---

## 1. Testing Wishlist Feature ❤️

### Add to Wishlist
1. Go to home page or products page
2. Hover over any product card
3. Click the **heart icon** (top-right corner)
4. ✅ Success toast: "Added to wishlist"
5. ✅ Heart icon turns filled/red
6. ✅ Header shows wishlist count badge

### View Wishlist
**Option 1:** Click wishlist icon in header (with count badge)
**Option 2:** Dashboard → User Menu → Wishlist

### From Wishlist Page You Can:
- Click product to view details
- Click "Add to Cart" to move item to cart
- Click trash icon to remove from wishlist
- View stock status (Low Stock / Out of Stock badges)

---

## 2. Testing Product Reviews ⭐

### Write a Review
1. Navigate to any product details page
2. Scroll down to **"Customer Reviews"** section
3. Click **"Write a Review"** button
4. Select star rating (1-5 stars)
5. Write your comment in the textarea
6. Click **"Submit Review"**
7. ✅ Success toast: "Review added successfully"
8. ✅ Your review appears in the list immediately

### View Reviews
- All reviews display below the review form
- Shows: Reviewer name, rating stars, date, comment
- Your reviews have a "Delete" button

### Delete Your Review
1. Find your review in the list
2. Click **"Delete"** button
3. ✅ Review removed immediately

---

## 3. Testing Coupon System 🎫

### Apply Coupon in Cart
1. Add products to cart
2. Go to cart page
3. Find **"Apply Coupon"** section in order summary
4. Enter coupon code (e.g., `SAVE20`)
5. Click **"Apply"** button
6. ✅ Green badge shows coupon and discount
7. ✅ Total price updated with discount
8. ✅ Discount shown in price breakdown

### Sample Coupon Codes (If Available)
Ask your backend admin for active coupon codes, or create one from admin panel.

**Coupon Requirements:**
- Must be active
- Not expired
- Minimum purchase amount met
- Usage limit not reached

### Remove Coupon
- Click **"Remove"** button on the green coupon badge
- ✅ Discount removed from total

---

## 4. Testing Razorpay Payment 💳

### Complete a Purchase
1. Add products to cart
2. Go to cart page
3. Ensure delivery address is set (Profile → Update address)
4. Apply coupon (optional)
5. Review final total
6. Click **"Proceed to Payment"** button

### Razorpay Checkout Flow
1. ✅ Razorpay modal opens
2. Pre-filled details: Name, Email, Phone
3. Select payment method:
   - Credit/Debit Card
   - UPI
   - Net Banking
   - Wallets

### Test Mode Payment (If Razorpay is in test mode)
**Test Card Details:**
```
Card Number: 4111 1111 1111 1111
CVV: Any 3 digits
Expiry: Any future date
Name: Any name
```

### After Successful Payment
- ✅ Success toast: "Payment Completed Successfully!"
- ✅ Cart cleared
- ✅ Redirected to Orders page
- ✅ Order appears in order list

---

## 🎯 Complete User Journey Test

### Scenario: Shop, Review, and Purchase with Coupon

1. **Browse & Wishlist**
   - Visit home page
   - Browse products
   - Add 2-3 products to wishlist
   - Check wishlist count in header

2. **View Product & Review**
   - Click on a product
   - Read existing reviews
   - Write your own review with 5 stars
   - See your review appear

3. **Add to Cart from Wishlist**
   - Go to wishlist page
   - Click "Add to Cart" on 2 items
   - Verify cart count updates

4. **Apply Coupon & Checkout**
   - Go to cart page
   - Enter coupon code
   - See discount applied
   - Review final price

5. **Complete Payment**
   - Click "Proceed to Payment"
   - Complete Razorpay payment
   - Verify order in Orders page

---

## 📱 Mobile Testing

### Responsive Features to Test
- Wishlist page grid layout (4 → 3 → 2 → 1 columns)
- Product card hover effects (tap on mobile)
- Review form on mobile screens
- Coupon input and apply button
- Razorpay modal on small screens
- Header wishlist icon and badges

---

## 🔍 Visual Indicators to Look For

### Wishlist
- ❤️ Heart icon: Outline (not in wishlist) → Filled red (in wishlist)
- 🔴 Red badge with count in header
- 📱 Responsive grid layout on wishlist page

### Reviews
- ⭐ Interactive star rating (hover/click)
- 📝 Review form with smooth transitions
- 👤 User name and date on reviews
- 🗑️ Delete button only on your reviews

### Coupons
- 🟢 Green success badge when applied
- 💰 Discount shown in price breakdown
- ❌ Red error for invalid coupons
- 🔄 Remove button to clear coupon

### Payment
- 🔵 Blue info badge about secure payment
- 💳 Razorpay branded checkout modal
- ✅ Success confirmation
- 🚫 Disabled button without address

---

## 🐛 Troubleshooting

### Wishlist Not Working?
**Check:**
- Are you logged in?
- Is backend server running?
- Check browser console for errors
- Verify API endpoints in Network tab

### Reviews Not Showing?
**Check:**
- Product ID is valid
- Backend review endpoint working
- No console errors
- Try refreshing the page

### Coupon Not Applying?
**Check:**
- Coupon code is correct (case-sensitive)
- Minimum purchase requirement met
- Coupon is active and not expired
- Check error message in toast

### Razorpay Modal Not Opening?
**Check:**
- Razorpay script loaded (check Network tab)
- Razorpay key is valid
- Backend order creation successful
- Browser console for errors

---

## ✅ Success Indicators

You'll know everything is working when:
- ✅ Wishlist count updates in real-time
- ✅ Heart icons toggle correctly
- ✅ Reviews appear immediately after submission
- ✅ Star rating is interactive
- ✅ Coupon discount calculates correctly
- ✅ Razorpay modal opens smoothly
- ✅ Payment success redirects to orders
- ✅ All toast notifications appear
- ✅ No console errors

---

## 📊 Feature Status Dashboard

| Feature | Status | Route | Auth Required |
|---------|--------|-------|---------------|
| Wishlist Page | ✅ Ready | `/dashborad/user/wishlist` | Yes |
| Add to Wishlist | ✅ Ready | Any product card | Yes |
| Product Reviews | ✅ Ready | `/product/:slug` | Yes (to write) |
| Apply Coupon | ✅ Ready | `/cart` | No |
| Razorpay Payment | ✅ Ready | `/cart` | Yes |
| Wishlist Header Icon | ✅ Ready | Header (global) | Yes |

---

## 🎓 Tips for Best Experience

1. **Use Chrome/Firefox** for best Razorpay compatibility
2. **Enable pop-ups** for Razorpay modal
3. **Test on mobile** to verify responsive design
4. **Use real email** for order confirmation (if enabled)
5. **Clear cache** if you see old behavior
6. **Check Redux DevTools** to see state changes

---

## 📞 Need Help?

**Common Solutions:**
- Refresh the page
- Clear browser cache
- Check if logged in
- Verify backend is running
- Check browser console
- Try in incognito mode

**Still having issues?**
Check the API_DOCUMENTATION.md for endpoint details and Redux slice implementation.

---

*Ready to test! Start with the wishlist feature and work your way through to payment.*

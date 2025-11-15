# Complete API Documentation

## Backend URL
```
Production: https://ecommercebackend-mrt6.onrender.com/api/v1
```

---

## 📋 Table of Contents
1. [Authentication APIs](#authentication-apis)
2. [Product APIs](#product-apis)
3. [Category APIs](#category-apis)
4. [Order APIs](#order-apis)
5. [Payment APIs (Razorpay)](#payment-apis)
6. [Review APIs](#review-apis)
7. [Wishlist APIs](#wishlist-apis)
8. [Coupon APIs](#coupon-apis)
9. [Analytics APIs](#analytics-apis)

---

## Authentication APIs

### 1. Register User
- **Endpoint:** `POST /api/v1/auth/register`
- **Access:** Public
- **Body:**
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "phone": "1234567890",
    "address": "123 Main St",
    "answer": "Football"
  }
  ```

### 2. Login User
- **Endpoint:** `POST /api/v1/auth/login`
- **Access:** Public
- **Body:**
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```

### 3. Forgot Password
- **Endpoint:** `POST /api/v1/auth/forget-password`
- **Access:** Public
- **Body:**
  ```json
  {
    "email": "john@example.com",
    "newPassword": "newpass123",
    "answer": "Football"
  }
  ```

### 4. Update Profile
- **Endpoint:** `PUT /api/v1/auth/profile`
- **Access:** User Required
- **Headers:** `Authorization: Bearer <token>`
- **Body:**
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "newpassword",
    "phone": "9876543210",
    "address": "456 Oak St"
  }
  ```

### 5. Verify User Auth
- **Endpoint:** `GET /api/v1/auth/user-auth`
- **Access:** User Required
- **Headers:** `Authorization: Bearer <token>`

### 6. Verify Admin Auth
- **Endpoint:** `GET /api/v1/auth/admin-auth`
- **Access:** Admin Only
- **Headers:** `Authorization: Bearer <token>`

---

## Product APIs

### 1. Get All Products
- **Endpoint:** `GET /api/v1/product/get-product`
- **Access:** Public
- **Returns:** First 12 products

### 2. Get Single Product
- **Endpoint:** `GET /api/v1/product/get-product/:slug`
- **Access:** Public
- **Params:** `slug` - Product slug

### 3. Get Product Photo
- **Endpoint:** `GET /api/v1/product/product-photo/:pid`
- **Access:** Public
- **Params:** `pid` - Product ID
- **Returns:** Image buffer

### 4. Create Product
- **Endpoint:** `POST /api/v1/product/create-product`
- **Access:** Admin Only
- **Headers:** `Authorization: Bearer <token>`
- **Content-Type:** `multipart/form-data`
- **Body:**
  ```json
  {
    "name": "Product Name",
    "description": "Product description",
    "price": 999,
    "category": "category_id",
    "quantity": 50,
    "photo": "<file>"
  }
  ```

### 5. Update Product
- **Endpoint:** `PUT /api/v1/product/update-product/:pid`
- **Access:** Admin Only
- **Headers:** `Authorization: Bearer <token>`

### 6. Delete Product
- **Endpoint:** `DELETE /api/v1/product/delete-product/:pid`
- **Access:** Admin Only
- **Headers:** `Authorization: Bearer <token>`

### 7. Filter Products
- **Endpoint:** `POST /api/v1/product/product-filters`
- **Access:** Public
- **Body:**
  ```json
  {
    "checked": ["category_id1", "category_id2"],
    "radio": [0, 1999]
  }
  ```

### 8. Get Product Count
- **Endpoint:** `GET /api/v1/product/product-count`
- **Access:** Public

### 9. Get Products List (Paginated)
- **Endpoint:** `GET /api/v1/product/product-list/:page`
- **Access:** Public
- **Params:** `page` - Page number (6 products per page)

### 10. Search Products
- **Endpoint:** `GET /api/v1/product/search/:keyword`
- **Access:** Public
- **Params:** `keyword` - Search term

### 11. Get Related Products
- **Endpoint:** `GET /api/v1/product/related-product/:pid/:cid`
- **Access:** Public
- **Params:** 
  - `pid` - Product ID
  - `cid` - Category ID

### 12. Get Products by Category
- **Endpoint:** `GET /api/v1/product/product-category/:slug`
- **Access:** Public
- **Params:** `slug` - Category slug

---

## Category APIs

### 1. Create Category
- **Endpoint:** `POST /api/v1/category/create-category`
- **Access:** Admin Only
- **Body:**
  ```json
  {
    "name": "Electronics"
  }
  ```

### 2. Update Category
- **Endpoint:** `PUT /api/v1/category/update-category/:id`
- **Access:** Admin Only
- **Body:**
  ```json
  {
    "name": "Updated Category Name"
  }
  ```

### 3. Get All Categories
- **Endpoint:** `GET /api/v1/category/get-category`
- **Access:** Public

### 4. Get Single Category
- **Endpoint:** `GET /api/v1/category/single-category/:slug`
- **Access:** Public

### 5. Delete Category
- **Endpoint:** `DELETE /api/v1/category/delete-category/:id`
- **Access:** Admin Only

---

## Order APIs

### 1. Get User Orders
- **Endpoint:** `GET /api/v1/auth/orders`
- **Access:** User Required
- **Headers:** `Authorization: Bearer <token>`

### 2. Get All Orders (Admin)
- **Endpoint:** `GET /api/v1/auth/all-orders`
- **Access:** Admin Only
- **Headers:** `Authorization: Bearer <token>`

### 3. Update Order Status
- **Endpoint:** `PUT /api/v1/auth/order-status/:orderId`
- **Access:** Admin Only
- **Body:**
  ```json
  {
    "status": "Processing"
  }
  ```

---

## Payment APIs (Razorpay)

### 1. Get Razorpay Key
- **Endpoint:** `GET /api/v1/product/razorpay/key`
- **Access:** Public
- **Returns:** Razorpay public key

### 2. Create Razorpay Order
- **Endpoint:** `POST /api/v1/product/razorpay/order`
- **Access:** User Required
- **Body:**
  ```json
  {
    "amount": 99900,
    "cart": []
  }
  ```

### 3. Verify Razorpay Payment
- **Endpoint:** `POST /api/v1/product/razorpay/payment`
- **Access:** User Required
- **Body:**
  ```json
  {
    "razorpay_order_id": "order_xxx",
    "razorpay_payment_id": "pay_xxx",
    "razorpay_signature": "signature_xxx",
    "cart": []
  }
  ```

---

## Review APIs

### 1. Add Product Review
- **Endpoint:** `POST /api/v1/product/review/:pid`
- **Access:** User Required
- **Body:**
  ```json
  {
    "rating": 5,
    "comment": "Great product!"
  }
  ```

### 2. Delete Review
- **Endpoint:** `DELETE /api/v1/product/review/:id`
- **Access:** User/Admin (User can delete own, Admin can delete any)

### 3. Get Product Reviews
- **Endpoint:** `GET /api/v1/product/reviews/:pid`
- **Access:** Public
- **Params:** `pid` - Product ID

---

## Wishlist APIs

### 1. Add to Wishlist
- **Endpoint:** `POST /api/v1/wishlist/add/:pid`
- **Access:** User Required
- **Params:** `pid` - Product ID

### 2. Remove from Wishlist
- **Endpoint:** `DELETE /api/v1/wishlist/remove/:pid`
- **Access:** User Required
- **Params:** `pid` - Product ID

### 3. Get User Wishlist
- **Endpoint:** `GET /api/v1/wishlist`
- **Access:** User Required

### 4. Get Wishlist Count
- **Endpoint:** `GET /api/v1/wishlist/count`
- **Access:** User Required

---

## Coupon APIs

### 1. Create Coupon
- **Endpoint:** `POST /api/v1/coupon/create`
- **Access:** Admin Only
- **Body:**
  ```json
  {
    "code": "SAVE20",
    "discountType": "percentage",
    "discountValue": 20,
    "minPurchase": 500,
    "maxDiscount": 200,
    "expiryDate": "2025-12-31",
    "usageLimit": 100
  }
  ```

### 2. Get All Coupons
- **Endpoint:** `GET /api/v1/coupon/all`
- **Access:** Public

### 3. Apply Coupon
- **Endpoint:** `POST /api/v1/coupon/apply`
- **Access:** User Required
- **Body:**
  ```json
  {
    "code": "SAVE20",
    "cartTotal": 1000
  }
  ```

### 4. Update Coupon
- **Endpoint:** `PUT /api/v1/coupon/update/:id`
- **Access:** Admin Only
- **Body:** Same as Create Coupon

### 5. Delete Coupon
- **Endpoint:** `DELETE /api/v1/coupon/delete/:id`
- **Access:** Admin Only

### 6. Toggle Coupon Status
- **Endpoint:** `PUT /api/v1/coupon/toggle/:id`
- **Access:** Admin Only
- **Description:** Activates or deactivates a coupon

---

## Analytics APIs

### 1. Get Overview
- **Endpoint:** `GET /api/v1/analytics/overview`
- **Access:** Admin Only
- **Returns:**
  ```json
  {
    "totalRevenue": 50000,
    "totalOrders": 150,
    "totalProducts": 200,
    "totalCustomers": 50
  }
  ```

### 2. Get Daily Sales
- **Endpoint:** `GET /api/v1/analytics/daily-sales`
- **Access:** Admin Only
- **Returns:** Array of daily sales data (last 30 days)

### 3. Get Monthly Sales
- **Endpoint:** `GET /api/v1/analytics/monthly-sales`
- **Access:** Admin Only
- **Returns:** Array of monthly sales data (last 12 months)

### 4. Get Top Products
- **Endpoint:** `GET /api/v1/analytics/top-products`
- **Access:** Admin Only
- **Returns:** Top 10 best-selling products

---

## Status Codes

| Code | Description |
|------|-------------|
| 200 | Success |
| 201 | Created |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 500 | Server Error |

---

## Redux Usage Examples

### Wishlist
```javascript
import { useDispatch, useSelector } from 'react-redux';
import { addToWishlist, fetchWishlist } from './redux/slices/wishlistSlice';

const dispatch = useDispatch();
const { items, count } = useSelector(state => state.wishlist);

// Add to wishlist
dispatch(addToWishlist(productId));

// Fetch wishlist
dispatch(fetchWishlist());
```

### Review
```javascript
import { addReview, fetchProductReviews } from './redux/slices/reviewSlice';

// Add review
dispatch(addReview({ 
  productId: 'xxx', 
  reviewData: { rating: 5, comment: 'Great!' }
}));

// Fetch reviews
dispatch(fetchProductReviews(productId));
```

### Coupon
```javascript
import { applyCoupon, clearAppliedCoupon } from './redux/slices/couponSlice';

// Apply coupon
dispatch(applyCoupon('SAVE20'));

// Clear coupon
dispatch(clearAppliedCoupon());
```

### Payment (Razorpay)
```javascript
import { getRazorpayKey, createRazorpayOrder } from './redux/slices/paymentSlice';

// Get Razorpay key
dispatch(getRazorpayKey());

// Create order
dispatch(createRazorpayOrder({ amount: 99900, cart }));
```

### Analytics
```javascript
import { fetchOverview, fetchDailySales } from './redux/slices/analyticsSlice';

// Fetch overview
dispatch(fetchOverview());

// Fetch daily sales
dispatch(fetchDailySales());
```

---

## Total API Count: 48 Endpoints

- **Public:** 19 endpoints
- **User Required:** 11 endpoints
- **Admin Only:** 18 endpoints

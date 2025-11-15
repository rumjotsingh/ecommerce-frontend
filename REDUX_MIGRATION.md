# Redux & API Configuration Migration

This document outlines the comprehensive migration to Redux state management and centralized API configuration.

## 🚀 What's New

### 1. Redux State Management
- **Redux Toolkit** integrated for state management
- Centralized state for auth, cart, products, categories, and orders
- Async thunks for API calls with loading and error states
- Persistent state with localStorage integration

### 2. Centralized API Configuration
- **Environment Variables**: API base URL now configurable via `.env`
- **API Endpoints**: All API routes centralized in `src/config/api.js`
- **Axios Instance**: Custom axios instance with interceptors for auth tokens
- **Type Safety**: Consistent endpoint structure across the application

### 3. New Backend URL
```
Production: https://ecommercebackend-mrt6.onrender.com/api/v1
```

## 📁 Project Structure

```
src/
├── config/
│   └── api.js                 # Centralized API endpoints
├── redux/
│   ├── store.js              # Redux store configuration
│   └── slices/
│       ├── authSlice.js      # Authentication state
│       ├── cartSlice.js      # Shopping cart state
│       ├── productSlice.js   # Products state
│       ├── categorySlice.js  # Categories state
│       └── orderSlice.js     # Orders state
├── utils/
│   └── axiosInstance.js      # Axios instance with interceptors
└── .env                      # Environment variables
```

## 🔧 Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

The following packages were added:
- `@reduxjs/toolkit` - Redux state management
- `react-redux` - React bindings for Redux

### 2. Environment Variables
Create a `.env` file in the root directory:
```env
REACT_APP_API_BASE_URL=https://ecommercebackend-mrt6.onrender.com/api/v1
```

### 3. Start Development Server
```bash
npm start
```

## 📝 API Endpoints Reference

All API endpoints are defined in `src/config/api.js`:

### Authentication
- `AUTH.REGISTER` - User registration
- `AUTH.LOGIN` - User login
- `AUTH.FORGOT_PASSWORD` - Password reset
- `AUTH.UPDATE_PROFILE` - Update user profile
- `AUTH.USER_AUTH` - Verify user authentication
- `AUTH.ADMIN_AUTH` - Verify admin authentication

### Products
- `PRODUCT.GET_ALL` - Get all products
- `PRODUCT.CREATE` - Create new product (admin)
- `PRODUCT.UPDATE(id)` - Update product (admin)
- `PRODUCT.DELETE(id)` - Delete product (admin)
- `PRODUCT.GET_SINGLE(slug)` - Get product by slug
- `PRODUCT.GET_PHOTO(id)` - Get product photo
- `PRODUCT.FILTER` - Filter products
- `PRODUCT.COUNT` - Get total product count
- `PRODUCT.LIST(page)` - Get paginated products
- `PRODUCT.SEARCH(keyword)` - Search products
- `PRODUCT.RELATED(pid, cid)` - Get related products
- `PRODUCT.CATEGORY(slug)` - Get products by category
- `PRODUCT.BRAINTREE_TOKEN` - Get payment token
- `PRODUCT.BRAINTREE_PAYMENT` - Process payment

### Categories
- `CATEGORY.GET_ALL` - Get all categories
- `CATEGORY.CREATE` - Create category (admin)
- `CATEGORY.UPDATE(id)` - Update category (admin)
- `CATEGORY.DELETE(id)` - Delete category (admin)
- `CATEGORY.GET_SINGLE(slug)` - Get category by slug

### Orders
- `ORDER.GET_ALL` - Get user orders
- `ORDER.GET_ALL_ADMIN` - Get all orders (admin)
- `ORDER.UPDATE_STATUS(orderId)` - Update order status (admin)

## 🔄 Redux Slices Usage

### Auth Slice
```javascript
import { useSelector, useDispatch } from 'react-redux';
import { loginUser, logout } from './redux/slices/authSlice';

// In component
const dispatch = useDispatch();
const { user, token, loading, error } = useSelector(state => state.auth);

// Login
dispatch(loginUser({ email, password }));

// Logout
dispatch(logout());
```

### Cart Slice
```javascript
import { useSelector, useDispatch } from 'react-redux';
import { addToCart, removeFromCart, clearCart } from './redux/slices/cartSlice';

// In component
const dispatch = useDispatch();
const { items } = useSelector(state => state.cart);

// Add to cart
dispatch(addToCart(product));

// Remove from cart
dispatch(removeFromCart(productId));

// Clear cart
dispatch(clearCart());
```

### Product Slice
```javascript
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts, fetchProductBySlug } from './redux/slices/productSlice';

// In component
const dispatch = useDispatch();
const { products, currentProduct, loading } = useSelector(state => state.product);

// Fetch all products
dispatch(fetchProducts());

// Fetch single product
dispatch(fetchProductBySlug(slug));
```

## 🛡️ Security Features

### Axios Interceptors
The custom axios instance (`src/utils/axiosInstance.js`) includes:

1. **Request Interceptor**
   - Automatically adds JWT token from localStorage to all requests
   - Adds Authorization header

2. **Response Interceptor**
   - Handles 401 (Unauthorized) - Redirects to login
   - Handles 403 (Forbidden) - Logs access denied
   - Handles 500 (Server Error) - Logs server errors

## 🔄 Migration from Context to Redux

The application now uses **both** Context API and Redux:
- **Context API**: Still used for backward compatibility (auth, cart, search contexts)
- **Redux**: New state management layer for advanced features

To fully migrate a component:

**Before (Context):**
```javascript
import { useAuth } from '../context/auth';
const [auth, setAuth] = useAuth();
```

**After (Redux):**
```javascript
import { useSelector, useDispatch } from 'react-redux';
import { loginUser } from '../redux/slices/authSlice';
const dispatch = useDispatch();
const { user, token } = useSelector(state => state.auth);
```

## 📦 Updated Files

### Pages
- ✅ All Auth pages (Login, Register, ForgotPassword)
- ✅ All Admin pages (CreateProduct, UpdateProduct, Products, CreateCategory, AdminOrder)
- ✅ All User pages (Profile, Orders)
- ✅ Public pages (Products, Search, CategoryProduct, CartPage, ProductDetails)

### Components
- ✅ ProductCard
- ✅ SearchInput
- ✅ FeaturedProducts
- ✅ Private route
- ✅ AdminRoute

### Hooks
- ✅ useCategory

### Configuration
- ✅ package.json (updated proxy)
- ✅ .env (new file)
- ✅ .env.example (template)

## 🎯 Benefits

1. **Maintainability**: Single source of truth for API endpoints
2. **Scalability**: Easy to add new endpoints or modify existing ones
3. **Type Safety**: Centralized endpoint functions reduce typos
4. **Environment Management**: Different URLs for dev/staging/production
5. **State Management**: Predictable state updates with Redux
6. **Performance**: Optimized re-renders with Redux selectors
7. **Developer Experience**: Better debugging with Redux DevTools

## 🚨 Important Notes

1. **Environment Variables**: Never commit `.env` to version control (already in `.gitignore`)
2. **API Base URL**: Update `.env` for different environments
3. **Token Management**: JWT tokens automatically attached to requests
4. **Backward Compatibility**: Existing Context API still works alongside Redux
5. **Photo URLs**: All product photo URLs now use `API_ENDPOINTS.PRODUCT.GET_PHOTO(id)`

## 🔍 Testing Checklist

- [ ] User registration and login
- [ ] Product listing and search
- [ ] Add to cart functionality
- [ ] Category filtering
- [ ] Admin product management
- [ ] Order placement
- [ ] Payment processing
- [ ] Profile updates
- [ ] Photo uploads and display

## 📚 Additional Resources

- [Redux Toolkit Documentation](https://redux-toolkit.js.org/)
- [React Redux Documentation](https://react-redux.js.org/)
- [Axios Documentation](https://axios-http.com/)

## 🤝 Contributing

When adding new API endpoints:
1. Add the endpoint to `src/config/api.js`
2. Create/update the corresponding Redux slice
3. Update this README with the new endpoint
4. Test thoroughly before committing

---

**Migration Date**: November 15, 2025
**Backend URL**: https://ecommercebackend-mrt6.onrender.com/api/v1
**Status**: ✅ Production Ready

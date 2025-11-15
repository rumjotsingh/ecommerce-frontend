// API Base URL Configuration
export const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL ||
  "https://ecommercebackend-mrt6.onrender.com/api/v1";

// API Endpoints
export const API_ENDPOINTS = {
  // Auth
  AUTH: {
    REGISTER: `${API_BASE_URL}/auth/register`,
    LOGIN: `${API_BASE_URL}/auth/login`,
    FORGOT_PASSWORD: `${API_BASE_URL}/auth/forgot-password`,
    UPDATE_PROFILE: `${API_BASE_URL}/auth/profile`,
    USER_AUTH: `${API_BASE_URL}/auth/user-auth`,
    ADMIN_AUTH: `${API_BASE_URL}/auth/admin-auth`,
    TEST: `${API_BASE_URL}/auth/test`,
  },

  // Category
  CATEGORY: {
    GET_ALL: `${API_BASE_URL}/category/get-category`,
    CREATE: `${API_BASE_URL}/category/create-category`,
    UPDATE: (id) => `${API_BASE_URL}/category/update-category/${id}`,
    DELETE: (id) => `${API_BASE_URL}/category/delete-category/${id}`,
    GET_SINGLE: (slug) => `${API_BASE_URL}/category/single-category/${slug}`,
  },

  // Product
  PRODUCT: {
    GET_ALL: `${API_BASE_URL}/product/get-product`,
    CREATE: `${API_BASE_URL}/product/create-product`,
    UPDATE: (id) => `${API_BASE_URL}/product/update-product/${id}`,
    DELETE: (id) => `${API_BASE_URL}/product/delete-product/${id}`,
    GET_SINGLE: (slug) => `${API_BASE_URL}/product/get-product/${slug}`,
    GET_PHOTO: (id) => `${API_BASE_URL}/product/product-photo/${id}`,
    FILTER: `${API_BASE_URL}/product/product-filters`,
    COUNT: `${API_BASE_URL}/product/product-count`,
    LIST: (page) => `${API_BASE_URL}/product/product-list/${page}`,
    SEARCH: (keyword) => `${API_BASE_URL}/product/search/${keyword}`,
    RELATED: (pid, cid) =>
      `${API_BASE_URL}/product/related-product/${pid}/${cid}`,
    CATEGORY: (slug) => `${API_BASE_URL}/product/product-category/${slug}`,
    BRAINTREE_TOKEN: `${API_BASE_URL}/product/braintree/token`,
    BRAINTREE_PAYMENT: `${API_BASE_URL}/product/braintree/payment`,
  },

  // Payment (Razorpay)
  PAYMENT: {
    RAZORPAY_KEY: `${API_BASE_URL}/product/razorpay/key`,
    RAZORPAY_ORDER: `${API_BASE_URL}/product/razorpay/order`,
    RAZORPAY_PAYMENT: `${API_BASE_URL}/product/razorpay/payment`,
  },

  // Review
  REVIEW: {
    ADD: (pid) => `${API_BASE_URL}/product/review/${pid}`,
    DELETE: (id) => `${API_BASE_URL}/product/review/${id}`,
    GET_ALL: (pid) => `${API_BASE_URL}/product/reviews/${pid}`,
  },

  // Wishlist
  WISHLIST: {
    ADD: (pid) => `${API_BASE_URL}/wishlist/add/${pid}`,
    REMOVE: (pid) => `${API_BASE_URL}/wishlist/remove/${pid}`,
    GET_ALL: `${API_BASE_URL}/wishlist/get`,
    GET_COUNT: `${API_BASE_URL}/wishlist/count`,
  },

  // Analytics
  ANALYTICS: {
    OVERVIEW: `${API_BASE_URL}/analytics/overview`,
    DAILY_SALES: `${API_BASE_URL}/analytics/daily-sales`,
    MONTHLY_SALES: `${API_BASE_URL}/analytics/monthly-sales`,
    TOP_PRODUCTS: `${API_BASE_URL}/analytics/top-products`,
  },

  // Coupon
  COUPON: {
    CREATE: `${API_BASE_URL}/coupon/create`,
    GET_ALL: `${API_BASE_URL}/coupon/all`,
    APPLY: `${API_BASE_URL}/coupon/apply`,
    DELETE: (id) => `${API_BASE_URL}/coupon/delete/${id}`,
    UPDATE: (id) => `${API_BASE_URL}/coupon/update/${id}`,
    TOGGLE: (id) => `${API_BASE_URL}/coupon/toggle/${id}`,
  },

  // Order
  ORDER: {
    GET_ALL: `${API_BASE_URL}/auth/orders`,
    GET_ALL_ADMIN: `${API_BASE_URL}/auth/all-orders`,
    UPDATE_STATUS: (orderId) => `${API_BASE_URL}/auth/order-status/${orderId}`,
  },

  // User
  USER: {
    GET_ALL: `${API_BASE_URL}/auth/all-users`,
  },
};

export default API_BASE_URL;

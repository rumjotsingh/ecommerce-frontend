import { createSlice } from "@reduxjs/toolkit";

// Get initial cart state from localStorage
const getInitialCartState = () => {
  try {
    const cart = localStorage.getItem("cart");
    return cart ? JSON.parse(cart) : [];
  } catch (error) {
    return [];
  }
};

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: getInitialCartState(),
  },
  reducers: {
    addToCart: (state, action) => {
      const { product, quantity = 1 } = action.payload;
      const existingItemIndex = state.items.findIndex(
        (item) => item._id === product._id
      );

      if (existingItemIndex !== -1) {
        // Product exists, update quantity
        state.items[existingItemIndex].orderQuantity =
          (state.items[existingItemIndex].orderQuantity || 1) + quantity;
      } else {
        // Product doesn't exist, add new
        state.items.push({ ...product, orderQuantity: quantity });
      }
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter((item) => item._id !== action.payload);
      localStorage.setItem("cart", JSON.stringify(state.items));
    },
    updateCartItemQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find((item) => item._id === id);
      if (item) {
        if (quantity <= 0) {
          // Remove item if quantity is 0 or less
          state.items = state.items.filter((item) => item._id !== id);
        } else {
          item.orderQuantity = quantity;
        }
        localStorage.setItem("cart", JSON.stringify(state.items));
      }
    },
    increaseQuantity: (state, action) => {
      const item = state.items.find((item) => item._id === action.payload);
      if (item) {
        item.orderQuantity = (item.orderQuantity || 1) + 1;
        localStorage.setItem("cart", JSON.stringify(state.items));
      }
    },
    decreaseQuantity: (state, action) => {
      const item = state.items.find((item) => item._id === action.payload);
      if (item) {
        if (item.orderQuantity <= 1) {
          // Remove item if quantity would be 0
          state.items = state.items.filter((i) => i._id !== action.payload);
        } else {
          item.orderQuantity = (item.orderQuantity || 1) - 1;
        }
        localStorage.setItem("cart", JSON.stringify(state.items));
      }
    },
    clearCart: (state) => {
      state.items = [];
      localStorage.removeItem("cart");
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateCartItemQuantity,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} = cartSlice.actions;
export default cartSlice.reducer;

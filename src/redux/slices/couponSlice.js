import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_ENDPOINTS } from "../../config/api";

// Async thunks
export const createCoupon = createAsyncThunk(
  "coupon/create",
  async (couponData, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(
        API_ENDPOINTS.COUPON.CREATE,
        couponData
      );
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create coupon"
      );
    }
  }
);

export const fetchAllCoupons = createAsyncThunk(
  "coupon/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(API_ENDPOINTS.COUPON.GET_ALL);
      return data.coupons;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch coupons"
      );
    }
  }
);

export const applyCoupon = createAsyncThunk(
  "coupon/apply",
  async ({ code, totalAmount }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post(API_ENDPOINTS.COUPON.APPLY, {
        code,
        totalAmount,
      });
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Invalid or expired coupon"
      );
    }
  }
);

export const deleteCoupon = createAsyncThunk(
  "coupon/delete",
  async (couponId, { rejectWithValue }) => {
    try {
      const { data } = await axios.delete(
        API_ENDPOINTS.COUPON.DELETE(couponId)
      );
      return { couponId, data };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete coupon"
      );
    }
  }
);

export const updateCoupon = createAsyncThunk(
  "coupon/update",
  async ({ couponId, couponData }, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(
        API_ENDPOINTS.COUPON.UPDATE(couponId),
        couponData
      );
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update coupon"
      );
    }
  }
);

export const toggleCoupon = createAsyncThunk(
  "coupon/toggle",
  async (couponId, { rejectWithValue }) => {
    try {
      const { data } = await axios.put(API_ENDPOINTS.COUPON.TOGGLE(couponId));
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to toggle coupon"
      );
    }
  }
);

const couponSlice = createSlice({
  name: "coupon",
  initialState: {
    coupons: [],
    appliedCoupon: null,
    discount: 0,
    loading: false,
    error: null,
  },
  reducers: {
    clearAppliedCoupon: (state) => {
      state.appliedCoupon = null;
      state.discount = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create coupon
      .addCase(createCoupon.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCoupon.fulfilled, (state, action) => {
        state.loading = false;
        state.coupons.push(action.payload.coupon);
      })
      .addCase(createCoupon.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch all coupons
      .addCase(fetchAllCoupons.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllCoupons.fulfilled, (state, action) => {
        state.loading = false;
        state.coupons = action.payload;
      })
      .addCase(fetchAllCoupons.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Apply coupon
      .addCase(applyCoupon.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(applyCoupon.fulfilled, (state, action) => {
        state.loading = false;
        das; // Backend returns {success: true, data: {...}}
        const couponData = action.payload.data || action.payload;
        state.appliedCoupon = {
          code: couponData.couponCode,
          discountType: couponData.discountType,
          discountValue: couponData.discountValue,
        };
        state.discount = parseFloat(couponData.discountAmount) || 0;
      })
      .addCase(applyCoupon.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete coupon
      .addCase(deleteCoupon.fulfilled, (state, action) => {
        state.coupons = state.coupons.filter(
          (c) => c._id !== action.payload.couponId
        );
      })
      // Update coupon
      .addCase(updateCoupon.fulfilled, (state, action) => {
        const index = state.coupons.findIndex(
          (c) => c._id === action.payload.coupon._id
        );
        if (index !== -1) {
          state.coupons[index] = action.payload.coupon;
        }
      })
      // Toggle coupon
      .addCase(toggleCoupon.fulfilled, (state, action) => {
        const index = state.coupons.findIndex(
          (c) => c._id === action.payload.coupon._id
        );
        if (index !== -1) {
          state.coupons[index] = action.payload.coupon;
        }
      });
  },
});

export const { clearAppliedCoupon } = couponSlice.actions;
export default couponSlice.reducer;

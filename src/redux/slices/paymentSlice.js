import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import axiosInstance from "../../utils/axiosInstance";
import { API_ENDPOINTS } from "../../config/api";

// Async thunks
export const getRazorpayKey = createAsyncThunk(
  "payment/getRazorpayKey",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(API_ENDPOINTS.PAYMENT.RAZORPAY_KEY);
      return data.key;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to get payment key"
      );
    }
  }
);

export const createRazorpayOrder = createAsyncThunk(
  "payment/createOrder",
  async (orderData, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post(
        API_ENDPOINTS.PAYMENT.RAZORPAY_ORDER,
        orderData
      );
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create order"
      );
    }
  }
);

export const verifyRazorpayPayment = createAsyncThunk(
  "payment/verifyPayment",
  async (paymentData, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.post(
        API_ENDPOINTS.PAYMENT.RAZORPAY_PAYMENT,
        paymentData
      );
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Payment verification failed"
      );
    }
  }
);

const paymentSlice = createSlice({
  name: "payment",
  initialState: {
    razorpayKey: null,
    order: null,
    loading: false,
    error: null,
    paymentSuccess: false,
  },
  reducers: {
    clearPaymentState: (state) => {
      state.order = null;
      state.error = null;
      state.paymentSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Get Razorpay key
      .addCase(getRazorpayKey.fulfilled, (state, action) => {
        state.razorpayKey = action.payload;
      })
      // Create order
      .addCase(createRazorpayOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createRazorpayOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload.order;
      })
      .addCase(createRazorpayOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Verify payment
      .addCase(verifyRazorpayPayment.pending, (state) => {
        state.loading = true;
      })
      .addCase(verifyRazorpayPayment.fulfilled, (state) => {
        state.loading = false;
        state.paymentSuccess = true;
        state.order = null;
      })
      .addCase(verifyRazorpayPayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.paymentSuccess = false;
      });
  },
});

export const { clearPaymentState } = paymentSlice.actions;
export default paymentSlice.reducer;

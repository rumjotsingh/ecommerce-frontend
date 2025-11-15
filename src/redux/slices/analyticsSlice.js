import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/axiosInstance";
import { API_ENDPOINTS } from "../../config/api";

// Async thunks
export const fetchOverview = createAsyncThunk(
  "analytics/fetchOverview",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(
        API_ENDPOINTS.ANALYTICS.OVERVIEW
      );
      return data.data; // Extract nested data
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch overview"
      );
    }
  }
);

export const fetchDailySales = createAsyncThunk(
  "analytics/fetchDailySales",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(
        API_ENDPOINTS.ANALYTICS.DAILY_SALES
      );
      return data.dailySales;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch daily sales"
      );
    }
  }
);

export const fetchMonthlySales = createAsyncThunk(
  "analytics/fetchMonthlySales",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(
        API_ENDPOINTS.ANALYTICS.MONTHLY_SALES
      );
      return data.monthlySales;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch monthly sales"
      );
    }
  }
);

export const fetchTopProducts = createAsyncThunk(
  "analytics/fetchTopProducts",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axiosInstance.get(
        API_ENDPOINTS.ANALYTICS.TOP_PRODUCTS
      );
      return data.data; // Extract nested data array
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch top products"
      );
    }
  }
);

const analyticsSlice = createSlice({
  name: "analytics",
  initialState: {
    overview: {
      totalRevenue: 0,
      totalOrders: 0,
      totalProducts: 0,
      pendingOrders: 0,
    },
    dailySales: [],
    monthlySales: [],
    topProducts: [],
    loading: false,
    error: null,
  },
  reducers: {
    clearAnalytics: (state) => {
      state.overview = {
        totalRevenue: 0,
        totalOrders: 0,
        totalProducts: 0,
        pendingOrders: 0,
      };
      state.dailySales = [];
      state.monthlySales = [];
      state.topProducts = [];
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch overview
      .addCase(fetchOverview.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOverview.fulfilled, (state, action) => {
        state.loading = false;
        state.overview = action.payload;
      })
      .addCase(fetchOverview.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch daily sales
      .addCase(fetchDailySales.fulfilled, (state, action) => {
        state.dailySales = action.payload;
      })
      // Fetch monthly sales
      .addCase(fetchMonthlySales.fulfilled, (state, action) => {
        state.monthlySales = action.payload;
      })
      // Fetch top products
      .addCase(fetchTopProducts.fulfilled, (state, action) => {
        state.topProducts = action.payload;
      });
  },
});

export const { clearAnalytics } = analyticsSlice.actions;
export default analyticsSlice.reducer;

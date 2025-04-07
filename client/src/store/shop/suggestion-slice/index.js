import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5001";

const initialState = {
  isLoading: false,
  suggestionList: [],
};

// Add a new suggestion
export const addNewSuggestion = createAsyncThunk(
  "/suggestions/addNewSuggestion",
  async (formData) => {
    const response = await axios.post(`${BASE_URL}/api/shop/suggestions`, formData);
    return response.data;
  }
);

// Fetch all suggestions
export const fetchNewSuggestion = createAsyncThunk(
  "/suggestions/fetchNewSuggestion",
  async () => {
    const response = await axios.get(`${BASE_URL}/api/shop/suggestions/get`);
    return response.data;
  }
);

// Edit a suggestion
export const editSuggestion = createAsyncThunk(
  "/suggestions/editSuggestion",
  async ({ suggestionId, formData }) => {
    const response = await axios.put(
      `${BASE_URL}/api/shop/suggestions/edit/${suggestionId}`,
      formData
    );
    return response.data;
  }
);

// Delete a suggestion
export const deleteSuggestion = createAsyncThunk(
  "/suggestions/deleteSuggestion",
  async (suggestionId) => {
    const response = await axios.delete(
      `${BASE_URL}/api/shop/suggestions/delete/${suggestionId}`
    );
    return response.data;
  }
);

const suggestionsSlice = createSlice({
  name: "suggestions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addNewSuggestion.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addNewSuggestion.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(addNewSuggestion.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchNewSuggestion.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchNewSuggestion.fulfilled, (state, action) => {
        state.isLoading = false;
        state.suggestionList = action.payload.data;
      })
      .addCase(fetchNewSuggestion.rejected, (state) => {
        state.isLoading = false;
        state.suggestionList = [];
      });
  },
});

export default suggestionsSlice.reducer;

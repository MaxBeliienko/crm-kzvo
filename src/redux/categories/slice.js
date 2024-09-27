import { createSlice } from '@reduxjs/toolkit';
import { fetchCategories } from './operations';

const handlePending = state => {
  state.loading = true;
};

const handleRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

const categoriesSlice = createSlice({
  name: 'categories',
  initialState: {
    categories: [],
    categoriesGoods: [],
    loading: false,
    error: null,
  },
  extraReducers: builder => {
    builder
      .addCase(fetchCategories.pending, handlePending)
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.categories = action.payload;
      })
      .addCase(fetchCategories.rejected, handleRejected);
  },
});

export const categoriesReducer = categoriesSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';
import {
  fetchCategories,
  addCategory,
  addCategoryWithId,
  updateCategory,
  deleteCategory,
} from './operations';

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
    totalCount: null,
    // categoryGoods: [],
    loading: false,
    error: null,
  },
  extraReducers: builder => {
    builder
      .addCase(fetchCategories.pending, handlePending)
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.categories = action.payload.sections;
        state.totalCount = action.payload.totalCount;
      })
      .addCase(fetchCategories.rejected, handleRejected)
      .addCase(addCategory.pending, handlePending)
      .addCase(addCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.categories.push(action.payload);
      })
      .addCase(addCategory.rejected, handleRejected)
      .addCase(addCategoryWithId.pending, handlePending)
      .addCase(addCategoryWithId.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.categories.push(action.payload);
      })
      .addCase(addCategoryWithId.rejected, handleRejected)
      .addCase(updateCategory.pending, handlePending)
      .addCase(updateCategory.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.categories.findIndex(
          category => category.id === action.payload.id
        );
        if (index !== -1) {
          state.categories[index] = action.payload;
        }
      })
      .addCase(updateCategory.rejected, handleRejected)
      .addCase(deleteCategory.pending, handlePending)
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.categories = state.categories.filter(
          category => category.id !== action.payload
        );
      })
      .addCase(deleteCategory.rejected, handleRejected);
  },
});

export const categoriesReducer = categoriesSlice.reducer;

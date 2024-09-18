import { createSlice } from '@reduxjs/toolkit';
import { fetchGoods, addGoods } from './operations';

const handlePending = state => {
  state.loading = true;
};

const handleRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

const goodsSlice = createSlice({
  name: 'goods',
  initialState: {
    goods: [],
    loading: false,
    error: null,
  },
  extraReducers: builder => {
    builder
      .addCase(fetchGoods.pending, handlePending)
      .addCase(fetchGoods.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.goods = action.payload;
      })
      .addCase(fetchGoods.rejected, handleRejected);
  },
});

export const goodsReducer = goodsSlice.reducer;

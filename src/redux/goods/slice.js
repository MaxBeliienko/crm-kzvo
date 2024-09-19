import { createSlice } from '@reduxjs/toolkit';
import { fetchGoods, addGoods, updateGoods, deleteGoods } from './operations';

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
      .addCase(fetchGoods.rejected, handleRejected)
      .addCase(addGoods.pending, handlePending)
      .addCase(addGoods.fulfilled, (state, action) => {
        state.loading = false;
        state.goods.push(action.payload);
      })
      .addCase(addGoods.rejected, handleRejected)
      .addCase(updateGoods.pending, handlePending)
      .addCase(updateGoods.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.goods.findIndex(
          good => good.id === action.payload.id
        );
        if (index !== -1) {
          state.goods[index] = action.payload;
        }
      })
      .addCase(updateGoods.rejected, handleRejected)
      .addCase(deleteGoods.pending, handlePending)
      .addCase(deleteGoods.fulfilled, (state, action) => {
        state.loading = false;
        state.goods = state.goods.filter(good => good.id !== action.payload);
      })
      .addCase(deleteGoods.rejected, handleRejected);
  },
});

export const goodsReducer = goodsSlice.reducer;

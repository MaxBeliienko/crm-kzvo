import { configureStore } from '@reduxjs/toolkit';
import { goodsReducer } from './goods/slice';

export const store = configureStore({
  reducer: {
    goods: goodsReducer,
  },
});

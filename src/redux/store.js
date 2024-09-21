import { configureStore } from '@reduxjs/toolkit';
import { goodsReducer } from './goods/slice';
import { modalReducer } from './modal/slice';

export const store = configureStore({
  reducer: {
    goods: goodsReducer,
    modal: modalReducer,
  },
});

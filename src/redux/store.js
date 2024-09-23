import { configureStore } from '@reduxjs/toolkit';
import i18n from 'i18next';
import { goodsReducer } from './goods/slice';
import { modalReducer } from './modal/slice';

export const store = configureStore({
  reducer: {
    goods: goodsReducer,
    modal: modalReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: {
          i18n,
        },
      },
    }),
});

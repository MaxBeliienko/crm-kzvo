import { configureStore } from '@reduxjs/toolkit';
import i18n from 'i18next';
import { goodsReducer } from './goods/slice';
import { modalReducer } from './modal/slice';
import { categoriesReducer } from './categories/slice';
import { devicesReducer } from './devices/slice';

export const store = configureStore({
  reducer: {
    goods: goodsReducer,
    modal: modalReducer,
    categories: categoriesReducer,
    devices: devicesReducer,
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

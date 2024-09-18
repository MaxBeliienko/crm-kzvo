import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

axios.defaults.baseURL = 'http://localhost:8080/api';
// axios.defaults.baseURL = 'http://192.168.0.135:8080/api';

const createSerializableError = error => ({
  message: error.message,
  name: error.name,
  code: error.code,
  response: error.response
    ? {
        status: error.response.status,
        data: error.response.data,
      }
    : undefined,
});

export const fetchGoods = createAsyncThunk(
  'goods/fetchGoods',
  async ({ databaseId, page = 0, limit = 10 }, thunkAPI) => {
    try {
      const response = await axios.get('/goods', {
        params: {
          databaseId,
          page,
          limit,
        },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(createSerializableError(error));
    }
  }
);

export const addGoods = createAsyncThunk(
  'goods/addGoods',
  async ({ databaseId, goodsData }, thunkAPI) => {
    try {
      const response = await axios.post(
        `/goods?databaseId=${databaseId}`,
        goodsData
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(createSerializableError(error));
    }
  }
);

export const updateGoods = createAsyncThunk(
  'goods/updateGoods',
  async ({ databaseId, goodsId, goodsData }, thunkAPI) => {
    try {
      const response = await axios.put(
        `/goods/${goodsId}?databaseId=${databaseId}`,
        goodsData
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(createSerializableError(error));
    }
  }
);

export const deleteGoods = createAsyncThunk(
  'goods/deleteGoods',
  async ({ databaseId, goodsId }, thunkAPI) => {
    try {
      await axios.delete(`/goods/${goodsId}?databaseId=${databaseId}`);
      return goodsId;
    } catch (error) {
      return thunkAPI.rejectWithValue(createSerializableError(error));
    }
  }
);

export const uploadFile = createAsyncThunk(
  'goods/uploadFile',
  async ({ databaseId, file, columnsJson, skipHeader = true }, thunkAPI) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      const response = await axios.post(
        `/goods/upload?databaseId=${databaseId}&columnsJson=${columnsJson}&skipHeader=${skipHeader}`,
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(createSerializableError(error));
    }
  }
);

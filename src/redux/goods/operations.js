import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import createSerializableError from '../../utils/serializableError';
import asyncThunkWrapper from '../../utils/asyncThunkWrapper';
import { toast } from 'react-toastify';

// axios.defaults.baseURL = 'http://localhost:8080/api';
axios.defaults.baseURL = 'http://192.168.0.135:8080/api';

export const fetchGoods = createAsyncThunk(
  'goods/fetchGoods',
  asyncThunkWrapper(
    async ({ databaseId = 1, page = 0, limit = 10 }, thunkAPI) => {
      const response = await axios.get('/goods', {
        params: {
          databaseId,
          page,
          limit,
        },
      });
      return response.data;
    }
  )
);

export const fetchGoodsByCategory = createAsyncThunk(
  'categories/fetchGoodsByCategory',
  asyncThunkWrapper(
    async ({ sectionId, databaseId = 1, page = 0, limit = 10 }) => {
      const response = await axios.get(
        `/goods/by-section?databaseId=${databaseId}&sectionId=${sectionId}&page=${page}&limit=${limit}`
      );
      return response.data;
    }
  )
);

export const addGoods = createAsyncThunk(
  'goods/addGoods',
  asyncThunkWrapper(
    async ({ databaseId = 1, goodsData, imageBase64 }, thunkAPI) => {
      const response = await axios.post(`/goods?databaseId=${databaseId}`, {
        goodsData,
        imageBase64,
      });
      return response.data;
    }
  )
);

export const updateGoods = createAsyncThunk(
  'goods/updateGoods',
  asyncThunkWrapper(
    async ({ databaseId = 1, goodsId, goodsData, imageBase64 }, thunkAPI) => {
      const response = await axios.put(
        `/goods/${goodsId}?databaseId=${databaseId}`,
        {
          goodsData,
          imageBase64,
        }
      );
      return response.data;
    }
  )
);

export const deleteGoods = createAsyncThunk(
  'goods/deleteGoods',
  asyncThunkWrapper(async ({ databaseId = 1, goodsId }, thunkAPI) => {
    await axios.delete(`/goods/${goodsId}?databaseId=${databaseId}`);
    return goodsId;
  })
);

export const uploadFile = createAsyncThunk(
  'goods/uploadFile',
  asyncThunkWrapper(
    async (
      {
        databaseId = 1,
        file,
        columnsJson = 'code;pre_code;id_scales;id_sections;id_templates;id_barcodes;name;price;type;data',
        skipHeader = true,
      },
      thunkAPI
    ) => {
      const formData = new FormData();
      formData.append('file', file);
      const response = await axios.post(
        `/goods/upload?databaseId=${databaseId}&columnsJson=${columnsJson}&skipHeader=${skipHeader}`,
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );
      return response.data;
    }
  )
);

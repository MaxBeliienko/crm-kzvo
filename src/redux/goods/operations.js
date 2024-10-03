import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import createSerializableError from '../../utils/serializableError';
import asyncThunkWrapper from '../../utils/asyncThunkWrapper';
import { toast } from 'react-toastify';

axios.defaults.baseURL = 'http://localhost:8080/api';

export const fetchGoods = createAsyncThunk(
  'goods/fetchGoods',
  asyncThunkWrapper(
    async ({ databaseId, page = 0, limit = 1000 }, thunkAPI) => {
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

export const addGoods = createAsyncThunk(
  'goods/addGoods',
  asyncThunkWrapper(async ({ databaseId, goodsData }, thunkAPI) => {
    const response = await axios.post(
      `/goods?databaseId=${databaseId}`,
      goodsData
    );
    return response.data;
  })
);

export const updateGoods = createAsyncThunk(
  'goods/updateGoods',
  asyncThunkWrapper(async ({ databaseId, goodsId, goodsData }, thunkAPI) => {
    const response = await axios.put(
      `/goods/${goodsId}?databaseId=${databaseId}`,
      goodsData
    );
    return response.data;
  })
);

export const deleteGoods = createAsyncThunk(
  'goods/deleteGoods',
  asyncThunkWrapper(async ({ databaseId, goodsId }, thunkAPI) => {
    await axios.delete(`/goods/${goodsId}?databaseId=${databaseId}`);
    return goodsId;
  })
);

export const uploadFile = createAsyncThunk(
  'goods/uploadFile',
  asyncThunkWrapper(
    async (
      {
        databaseId,
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

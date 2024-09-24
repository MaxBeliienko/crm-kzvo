import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

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
  async ({ databaseId, page = 0, limit = 1000 }, thunkAPI) => {
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
      toast.success(thunkAPI.extra.i18n.t('description.toast.AddProduct'));
      return response.data;
    } catch (error) {
      toast.error(thunkAPI.extra.i18n.t('description.toast.AddProductError'));
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
      toast.success(thunkAPI.extra.i18n.t('description.toast.EditProduct'));
      return response.data;
    } catch (error) {
      toast.error(thunkAPI.extra.i18n.t('description.toast.EditProductError'));
      return thunkAPI.rejectWithValue(createSerializableError(error));
    }
  }
);

export const deleteGoods = createAsyncThunk(
  'goods/deleteGoods',
  async ({ databaseId, goodsId }, thunkAPI) => {
    try {
      await axios.delete(`/goods/${goodsId}?databaseId=${databaseId}`);
      toast.success(thunkAPI.extra.i18n.t('description.toast.DeleteProduct'));
      return goodsId;
    } catch (error) {
      toast.error(
        thunkAPI.extra.i18n.t('description.toast.DeleteProductError')
      );
      return thunkAPI.rejectWithValue(createSerializableError(error));
    }
  }
);

export const uploadFile = createAsyncThunk(
  'goods/uploadFile',
  async (
    {
      databaseId,
      file,
      columnsJson = 'code;pre_code;id_scales;id_sections;id_templates;id_barcodes;name;price;type;data',
      skipHeader = true,
    },
    thunkAPI
  ) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      const response = await axios.post(
        `/goods/upload?databaseId=${databaseId}&columnsJson=${columnsJson}&skipHeader=${skipHeader}`,
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );
      toast.success(thunkAPI.extra.i18n.t('description.toast.AddGoodsFile'));
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(createSerializableError(error));
    }
  }
);

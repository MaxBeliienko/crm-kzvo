import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import asyncThunkWrapper from '../../utils/asyncThunkWrapper';

export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  asyncThunkWrapper(async ({ databaseId = 1, page = 0, limit = 10 }) => {
    const response = await axios.get('/sections', {
      params: {
        databaseId,
        page,
        limit,
      },
    });
    return response.data;
  })
);

export const addCategory = createAsyncThunk(
  'categories/addCategory',
  asyncThunkWrapper(async ({ databaseId = 1, categoryData }) => {
    const response = await axios.post(
      `/sections?databaseId=${databaseId}`,
      categoryData
    );
    return response.data;
  })
);

export const addCategoryWithId = createAsyncThunk(
  'categories/addCategoryWithId',
  asyncThunkWrapper(async ({ databaseId = 1, categoryData }) => {
    const response = await axios.post(
      `/sections/with-id?databaseId=${databaseId}`,
      categoryData
    );
    return response.data;
  })
);

export const updateCategory = createAsyncThunk(
  'categories/updateCategory',
  asyncThunkWrapper(async ({ databaseId = 1, sectionId, categoryData }) => {
    const response = await axios.put(
      `/sections/${sectionId}?databaseId=${databaseId}`,
      categoryData
    );
    return response.data;
  })
);

export const deleteCategory = createAsyncThunk(
  'categories/deleteCategory',
  asyncThunkWrapper(async ({ databaseId = 1, categoryId }) => {
    await axios.delete(`/sections/${categoryId}?databaseId=${databaseId}`);
    return categoryId;
  })
);

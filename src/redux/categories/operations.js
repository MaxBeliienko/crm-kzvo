import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import asyncThunkWrapper from '../../utils/asyncThunkWrapper';

export const fetchCategories = createAsyncThunk(
  'categories/fetchCategories',
  asyncThunkWrapper(async ({ databaseId = 9, page = 0, limit = 100 }) => {
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
  asyncThunkWrapper(async ({ databaseId = 9, categoryData, imageBase64 }) => {
    const response = await axios.post(`/sections?databaseId=${databaseId}`, {
      categoryData,
      imageBase64,
    });
    return response.data;
  })
);

export const addCategoryWithId = createAsyncThunk(
  'categories/addCategoryWithId',
  asyncThunkWrapper(async ({ databaseId = 9, categoryData, imageBase64 }) => {
    const response = await axios.post(
      `/sections/with-id?databaseId=${databaseId}`,
      {
        categoryData,
        imageBase64,
      }
    );
    return response.data;
  })
);

export const updateCategory = createAsyncThunk(
  'categories/updateCategory',
  asyncThunkWrapper(
    async ({ databaseId = 9, sectionId, categoryData, imageBase64 }) => {
      const response = await axios.put(
        `/sections/${sectionId}?databaseId=${databaseId}`,
        {
          categoryData,
          imageBase64,
        }
      );
      return response.data;
    }
  )
);

export const deleteCategory = createAsyncThunk(
  'categories/deleteCategory',
  asyncThunkWrapper(async ({ databaseId = 9, categoryId }) => {
    await axios.delete(`/sections/${categoryId}?databaseId=${databaseId}`);
    return categoryId;
  })
);

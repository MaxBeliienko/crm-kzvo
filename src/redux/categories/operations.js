import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import asyncThunkWrapper from '../../utils/asyncThunkWrapper';

// Mock дані
// const fetchCategoriesMock = async () => {
//   return new Promise(resolve => {
//     setTimeout(() => {
//       resolve([
//         { id: 1, name: 'Категорія 1', sectionId: 101 },
//         { id: 2, name: 'Категорія 2', sectionId: 102 },
//         { id: 3, name: 'Категорія 3', sectionId: 103 },
//         { id: 4, name: 'Категорія 4', sectionId: 104 },
//         { id: 5, name: 'Категорія 5', sectionId: 105 },
//         { id: 6, name: 'Категорія 6', sectionId: 106 },
//         { id: 7, name: 'Категорія 7', sectionId: 107 },
//         { id: 8, name: 'Категорія 8', sectionId: 108 },
//         { id: 9, name: 'Категорія 9', sectionId: 109 },
//         { id: 10, name: 'Категорія 10', sectionId: 110 },
//       ]);
//     }, 1000);
//   });
// };

// export const fetchCategories = createAsyncThunk(
//   'categories/fetchCategories',
//   asyncThunkWrapper(async () => {
//     const response = await fetchCategoriesMock(); //!Замінити на реальний API
//     return response;
//   })
// );

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

export const fetchGoodsByCategory = createAsyncThunk(
  'categories/fetchGoodsByCategory',
  asyncThunkWrapper(async ({ categoryId }) => {
    const response = await axios.get(`/sections/${categoryId}`); //! Замінити на правильний
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

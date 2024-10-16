import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
import asyncThunkWrapper from '../../utils/asyncThunkWrapper';

export const fetchAllDatabase = createAsyncThunk(
  'devices/fetchAllDatabase',
  asyncThunkWrapper(async () => {
    const response = await axios.get('/connections');
    return response.data;
  })
);

export const fetchDatabaseById = createAsyncThunk(
  'devices/fetchDatabaseById',
  asyncThunkWrapper(async ({ databaseId = 1 }) => {
    const response = await axios.get(`/connections/${databaseId}`);
    return response.data;
  })
);

export const updateDatabaseById = createAsyncThunk(
  'devices/updateDatabaseById',
  asyncThunkWrapper(async ({ databaseId = 1, databaseData }) => {
    const response = await axios.put(
      `/connections/${databaseId}`,
      databaseData
    );
    return response.data;
  })
);

export const addDatabaseConnection = createAsyncThunk(
  'devices/addDatabaseConnection',
  asyncThunkWrapper(async ({ databaseData }) => {
    const response = await axios.post('/connections', databaseData);
    return response.data;
  })
);

export const deleteDatabaseConnection = createAsyncThunk(
  'devices/deleteDatabaseConnection',
  asyncThunkWrapper(async ({ databaseId = 1 }) => {
    await axios.delete(`/connections/${databaseId}`);
    return databaseId;
  })
);

export const addColumnModel = createAsyncThunk(
  'devices/addColumnModel',
  asyncThunkWrapper(async ({ databaseId = 1 }) => {
    const response = await axios.post(`/connections/${databaseId}/columns`);
    return response;
  })
);

import { createSlice } from '@reduxjs/toolkit';
import {
  fetchAllDatabase,
  fetchDatabaseById,
  updateDatabaseById,
  addDatabaseConnection,
  deleteDatabaseConnection,
  addColumnModel,
} from './operations';

const handlePending = state => {
  state.loading = true;
};

const handleRejected = (state, action) => {
  state.loading = false;
  state.error = action.payload;
};

const devicesSlice = createSlice({
  name: 'devices',
  initialState: {
    devices: [],
    currentDevice: null,
    loading: false,
    error: null,
  },
  extraReducers: builder => {
    builder
      .addCase(fetchAllDatabase.pending, handlePending)
      .addCase(fetchAllDatabase.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.devices = action.payload;
      })
      .addCase(fetchAllDatabase.rejected, handleRejected)
      .addCase(fetchDatabaseById.pending, handlePending)
      .addCase(fetchDatabaseById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentDevice = action.payload;
      })
      .addCase(fetchDatabaseById.rejected, handleRejected)
      .addCase(addDatabaseConnection.pending, handlePending)
      .addCase(addDatabaseConnection.fulfilled, (state, action) => {
        state.loading = false;
        state.devices.push(action.payload);
      })
      .addCase(addDatabaseConnection.rejected, handleRejected)
      .addCase(updateDatabaseById.pending, handlePending)
      .addCase(updateDatabaseById.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.devices.findIndex(
          device => device.id === action.payload.id
        );
        if (index !== -1) {
          state.devices[index] = action.payload;
        }
      })
      .addCase(updateDatabaseById.rejected, handleRejected)
      .addCase(deleteDatabaseConnection.pending, handlePending)
      .addCase(deleteDatabaseConnection.fulfilled, (state, action) => {
        state.loading = false;
        state.devices = state.devices.filter(
          device => device.id !== action.meta.arg.databaseId
        );
      })
      .addCase(deleteDatabaseConnection.rejected, handleRejected);
  },
});

export const devicesReducer = devicesSlice.reducer;

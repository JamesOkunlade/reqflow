import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import api from '../../utils/api';

export const fetchRequests = createAsyncThunk('requests', async (authToken, { rejectWithValue }) => {
  try {
    return await api.fetchRequests(authToken);
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const fetchRequestById = createAsyncThunk('requests/fetchRequestById', async ({ id, authToken }, { rejectWithValue }) => {
  try {
    return await api.fetchRequestById(id, authToken);
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const createRequest = createAsyncThunk('requests/createRequest', async ({ dataToSend, authToken }, { rejectWithValue }) => {
  try {
    return await api.createRequest(dataToSend, authToken);
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const updateRequest = createAsyncThunk('requests/updateRequest', async ({ requestId, dataToSend, authToken }, { rejectWithValue }) => {
  try {
    return await api.updateRequest(requestId, dataToSend, authToken);
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const deleteRequest = createAsyncThunk('requests/deleteRequest', async ({ requestId, authToken }, { rejectWithValue }) => {
  try {
    return await api.deleteRequest(requestId, authToken);
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const requestsSlice = createSlice({
  name: 'requests',
  initialState: {
    requests: [],
    request: null,
    isFetching: false,
    isCreating: false,
    isUpdating: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRequests.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(fetchRequests.fulfilled, (state, action) => {
        state.requests = action.payload;
        state.isFetching = false;
      })
      .addCase(fetchRequests.rejected, (state, action) => {
        state.isFetching = false;
        state.error = action.payload;
        toast.error(`Error fetching requests: ${action.payload}`);
      })
      .addCase(fetchRequestById.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(fetchRequestById.fulfilled, (state, action) => {
        state.request = action.payload;
        state.isFetching = false;
      })
      .addCase(fetchRequestById.rejected, (state, action) => {
        state.isFetching = false;
        state.error = action.payload;
        toast.error(`Error fetching request: ${action.payload}`);
      })
      .addCase(createRequest.pending, (state) => {
        state.isCreating = true;
      })
      .addCase(createRequest.fulfilled, (state, action) => {
        state.requests.push(action.payload);
        state.isCreating = false;
        toast.success('Request created successfully!');
      })
      .addCase(createRequest.rejected, (state, action) => {
        state.isCreating = false;
        state.error = action.payload;
        toast.error(`Error creating request: ${action.payload}`);
      })
      .addCase(updateRequest.pending, (state) => {
        state.isUpdating = true;
      })
      .addCase(updateRequest.fulfilled, (state, action) => {
        const index = state.requests.findIndex((request) => request.id === action.payload.id);
        if (index !== -1) {
          state.requests[index] = action.payload;
        }
        state.isUpdating = false;
        toast.success('Request updated successfully!');
      })
      .addCase(updateRequest.rejected, (state, action) => {
        state.isUpdating = false;
        state.error = action.payload;
        toast.error(`Error updating request: ${action.payload}`);
      })
      .addCase(deleteRequest.fulfilled, (state, action) => {
        state.requests = state.requests.filter((request) => request.id !== action.meta.arg.requestId);
        toast.success('Request deleted successfully!');
      })
      .addCase(deleteRequest.rejected, (state, action) => {
        state.error = action.payload;
        toast.error(`Error deleting request: ${action.payload}`);
      });
  },
});

export default requestsSlice.reducer;

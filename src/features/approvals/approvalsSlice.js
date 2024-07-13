import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import api from '../../utils/api';

export const fetchApprovals = createAsyncThunk('approvals', async (authToken, { rejectWithValue }) => {
  try {
    return await api.fetchApprovals(authToken);
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const approve = createAsyncThunk('approvals/approve', async ({ approvalId, authToken }, { rejectWithValue }) => {
  try {
    return await api.approve(approvalId, authToken);
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const reject = createAsyncThunk('approvals/reject', async ({ approvalId, authToken }, { rejectWithValue }) => {
  try {
    return await api.reject(approvalId, authToken);
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const approvalsSlice = createSlice({
  name: 'approvals',
  initialState: {
    approvals: [],
    isFetching: false,
    isConfirming: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchApprovals.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(fetchApprovals.fulfilled, (state, action) => {
        state.approvals = action.payload;
        state.isFetching = false;
      })
      .addCase(fetchApprovals.rejected, (state, action) => {
        state.isFetching = false;
        state.error = action.payload;
        toast.error(`Error fetching approvals: ${action.payload}`);
      })
      .addCase(approve.pending, (state) => {
        state.isConfirming = true;
      })
      .addCase(approve.fulfilled, (state, action) => {
        state.isConfirming = false;
        toast.success('Approval successful!');
      })
      .addCase(approve.rejected, (state, action) => {
        state.isConfirming = false;
        state.error = action.payload;
        toast.error(`Error approving: ${action.payload}`);
      })
      .addCase(reject.pending, (state) => {
        state.isConfirming = true;
      })
      .addCase(reject.fulfilled, (state, action) => {
        state.isConfirming = false;
        toast.success('Rejection successful!');
      })
      .addCase(reject.rejected, (state, action) => {
        state.isConfirming = false;
        state.error = action.payload;
        toast.error(`Error rejecting: ${action.payload}`);
      });
  },
});

export default approvalsSlice.reducer;

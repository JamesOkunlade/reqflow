import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import api from '../../utils/api';

export const signup = createAsyncThunk('auth/signup', async (formData, { rejectWithValue }) => {
  try {
    return await api.signup(formData);
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const login = createAsyncThunk('auth/login', async (formData, { rejectWithValue }) => {
  try {
    return await api.login(formData);
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isAuthenticated: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(signup.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = !!action.payload.auth_token;
        state.error = null;
        toast.success('Signup successful!');
      })
      .addCase(signup.rejected, (state, action) => {
        state.user = null;
        state.isAuthenticated = false;
        state.error = action.payload;
        toast.error(`Error signing up: ${action.payload}`);
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = !!action.payload.auth_token;
        state.error = null;
        toast.success('Login successful!');
      })
      .addCase(login.rejected, (state, action) => {
        state.user = null;
        state.isAuthenticated = false;
        state.error = action.payload;
        toast.error(`Error logging in: ${action.payload}`);
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;

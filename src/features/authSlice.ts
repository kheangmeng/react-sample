import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import { handleLogin } from '../api/authApi';
import type { AuthUser, AuthState } from '../types';

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  token: null,
  isLoading: false,
  error: null,
  statusMessage: null,
};

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await handleLogin(credentials);
      return response; // { user, token }
    } catch (error: any) {
      return rejectWithValue(error.message || 'Login failed');
    }
  }
);

const authSlice = createSlice({
  name: 'auth', // Unique name for this slice
  initialState,
  reducers: {
    clearAuthMessages: (state) => {
      state.error = null;
      state.statusMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.statusMessage = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<{ user: AuthUser; token: string }>) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
    },
});

export const { clearAuthMessages } = authSlice.actions;
export default authSlice.reducer;

import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import { handleCreateCategory, handleFetchCategories } from '../api/categoryApi';
import type { Category, CategoryResponse, CategoryState, Pagination } from '../types';

const initialState: CategoryState = {
  category: null,
  categories: [],
  isLoading: false,
  error: null,
  statusMessage: null,
};

export const createCategory = createAsyncThunk(
  'category/createCategory',
  async (req: Category, { rejectWithValue }) => {
    try {
      const response = await handleCreateCategory(req);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Create failed');
    }
  }
);

export const fetchCategories = createAsyncThunk(
  'category/fetchCategories',
  async (pagination: Pagination, { rejectWithValue }) => {
    try {
      const response = await handleFetchCategories(pagination);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Fetch failed');
    }
  }
);

const authSlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    clearCategoryMessages: (state) => {
      state.error = null;
      state.statusMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createCategory.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.statusMessage = null;
      })
      .addCase(createCategory.fulfilled, (state, action: PayloadAction<{ category: CategoryResponse, message: string }>) => {
        state.isLoading = false;
        // state.category = action.payload.category;
        state.categories = [...state.categories, action.payload.category]
        state.statusMessage = action.payload.message;
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      .addCase(fetchCategories.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.statusMessage = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action: PayloadAction<{ categories: CategoryResponse[], message: string }>) => {
        state.isLoading = false;
        state.categories = action.payload.categories;
        state.statusMessage = action.payload.message;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
    },
});

export const { clearCategoryMessages } = authSlice.actions;
export default authSlice.reducer;

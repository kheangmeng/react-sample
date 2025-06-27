import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import { handleCreateProduct, handleFetchProducts } from '../api/productApi';
import type { Product, ProductList, ProductState, Pagination } from '../types';

const initialState: ProductState = {
  product: null,
  products: [],
  isLoading: false,
  error: null,
  statusMessage: null,
};

export const createProduct = createAsyncThunk(
  'product/createProduct',
  async (req: Product, { rejectWithValue }) => {
    try {
      const response = await handleCreateProduct(req);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Create failed');
    }
  }
);

export const fetchCategories = createAsyncThunk(
  'product/fetchCategories',
  async (pagination: Pagination, { rejectWithValue }) => {
    try {
      const response = await handleFetchProducts(pagination);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Fetch failed');
    }
  }
);

const authSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    clearCategoryMessages: (state) => {
      state.error = null;
      state.statusMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createProduct.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.statusMessage = null;
      })
      .addCase(createProduct.fulfilled, (state, action: PayloadAction<{ message: string }>) => {
        state.isLoading = false;
        state.statusMessage = action.payload.message;
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })

      .addCase(fetchCategories.pending, (state) => {
        state.isLoading = true;
        state.error = null;
        state.statusMessage = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action: PayloadAction<{ products: ProductList[], message: string }>) => {
        state.isLoading = false;
        state.products = action.payload.products;
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

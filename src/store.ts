import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authReducer from './features/authSlice';
import categoryReducer from './features/categorySlice';
import productReducer from './features/productSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  category: categoryReducer,
  product: productReducer,
});

export const store = configureStore({
  reducer: rootReducer,
  // Middleware is automatically configured by configureStore,
  // including redux-thunk for createAsyncThunk.
  devTools: process.env.NODE_ENV !== 'production',
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

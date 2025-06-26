// src/app/storeRTK.ts
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice'; // Import your auth slice`
// import authReducerRTK from '../features/auth/authSliceRTK'; // Import your auth slice
// Import other reducers if you have them
// import userReducer from '../features/user/userSlice'; // Example

const rootReducer = combineReducers({
  auth: authReducer,
  // user: userReducer, // Example
  // Add other reducers here
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

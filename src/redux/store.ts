import { apiSlice } from '@/redux/apiSlice';
import { signupApiSlice } from '@/redux/signupApiSlice';
import { configureStore } from '@reduxjs/toolkit';
import modalReducer from '@/redux/slices/modalSlice';
import signupReducer from '@/redux/slices/signupSlice';
import { signupLocalStorageMiddleware } from '@/redux/signupLocalStorageMiddleware';

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    [signupApiSlice.reducerPath]: signupApiSlice.reducer,
    modal: modalReducer,
    signup: signupReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(apiSlice.middleware)
      .concat(signupApiSlice.middleware)
      .concat(signupLocalStorageMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


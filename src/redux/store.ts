import { apiSlice } from '@/redux/apiSlice';
import { signupApiSlice } from '@/redux/signupApiSlice';
import { configureStore } from '@reduxjs/toolkit';
import signupReducer from '@/redux/slices/signupSlice';

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    [signupApiSlice.reducerPath]: signupApiSlice.reducer,
    signup: signupReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(apiSlice.middleware)
      .concat(signupApiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


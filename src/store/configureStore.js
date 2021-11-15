import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/auth';

// eslint-disable-next-line import/prefer-default-export
export const createStore = () =>
  configureStore({
    reducer: {
      auth: authReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
  });

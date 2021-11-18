import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/auth';
import notesReducer from './slices/notes';

// eslint-disable-next-line import/prefer-default-export
export const createStore = () =>
  configureStore({
    reducer: {
      auth: authReducer,
      notes: notesReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
  });

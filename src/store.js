import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import notesReducer from "./features/notesSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    notes: notesReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;

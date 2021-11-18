/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createNote } from '../../services';

const initialState = {
  loading: true,
  notes: [],
  error: '',
};

export const requestCreateNote = createAsyncThunk(
  'notes/createNote',
  async (noteData, { rejectWithValue }) => {
    try {
      const { content, title, userId } = noteData;
      await createNote({ content, title, userId });
    } catch (error) {
      rejectWithValue(error?.message);
    }
  }
);
const noteSlice = createSlice({
  name: 'note',
  initialState,
  reducers: {
    setNotes: (state, action) => {
      state.notes = [...state.notes, ...action.payload];
      state.loading = false;
    },
    unsetNote: (state) => {
      state.notes = [];
    },
  },
});

export const { setNotes, unsetNote } = noteSlice.actions;
export default noteSlice.reducer;

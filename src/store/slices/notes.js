/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createNote, deleteNote, getNotes, updateNote } from '../../services';

const initialState = {
  loading: false,
  notes: [],
  error: '',
};

export const requestCreateNote = createAsyncThunk(
  'notes/requestCreateNote',
  async (noteData, { rejectWithValue }) => {
    try {
      const { content, title, userId } = noteData;
      const res = await createNote({ content, title, userId });
      return res?.id;
    } catch (error) {
      return rejectWithValue(error?.message);
    }
  }
);

export const requestDeleteNote = createAsyncThunk(
  'notes/requestDeleteNote',
  async (noteId, { rejectWithValue, dispatch }) => {
    try {
      await deleteNote(noteId);
      // eslint-disable-next-line no-use-before-define
      await dispatch(updateNotes(noteId));
    } catch (error) {
      rejectWithValue(error?.message);
    }
  }
);

export const requestUpdateNote = createAsyncThunk(
  'notes/requestUpdateNote',
  async (noteData, { rejectWithValue }) => {
    const { title, content, userId, noteId } = noteData;
    try {
      await updateNote({ title, content, userId, noteId });
    } catch (error) {
      rejectWithValue(error?.message);
    }
  }
);

export const requestGetNotes = createAsyncThunk(
  'notes/requestGetNotes',
  async (userId, { rejectWithValue }) => {
    try {
      const res = await getNotes(userId);
      const docs = [];
      if (res.docs) {
        res.docs.forEach((doc) => {
          docs.push({ id: doc.id, ...doc.data() });
        });
      }
      return docs;
    } catch (error) {
      return rejectWithValue(error?.message);
    }
  }
);
const noteSlice = createSlice({
  name: 'note',
  initialState,
  reducers: {
    updateNotes: (state, action) => {
      state.notes = state.notes.filter((note) => note.id !== action.payload);
    },
  },
  extraReducers: {
    [requestGetNotes.pending]: (state) => {
      state.loading = true;
      state.error = '';
    },
    [requestGetNotes.fulfilled]: (state, action) => {
      state.notes = [...action.payload];
      state.loading = false;
    },
    [requestGetNotes.rejected]: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { updateNotes } = noteSlice.actions;
export default noteSlice.reducer;

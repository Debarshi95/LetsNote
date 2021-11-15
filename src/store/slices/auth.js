/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { signinWithCredentials, signout } from '../../services';

export const requestSignIn = createAsyncThunk(
  'auth/signin',
  async (inputData, { rejectWithValue }) => {
    try {
      const { email, password } = inputData;
      const res = await signinWithCredentials(email, password);
      return res;
    } catch (error) {
      return rejectWithValue(error?.message);
    }
  }
);

export const requestSignOut = createAsyncThunk('auth/signout', async () => {
  await signout();
});

const initialState = {
  loading: false,
  user: null,
  error: '',
  isAuthenticated: false,
};
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },
    unsetUser: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
  extraReducers: {
    [requestSignIn.pending]: (state) => {
      state.loading = true;
    },
    [requestSignIn.fulfilled]: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
    },
    [requestSignIn.rejected]: (state, action) => {
      state.isAuthenticated = false;
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { setUser, unsetUser } = authSlice.actions;
export default authSlice.reducer;

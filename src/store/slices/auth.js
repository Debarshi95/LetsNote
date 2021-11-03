/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { signinWithCredentials } from '../../services';

const signIn = createAsyncThunk('auth/signIn', async (inputData) => {
  try {
    const { email, password } = inputData;
    const res = await signinWithCredentials(email, password);
    console.log({ res });
  } catch (error) {
    //
  }
});

const initialState = {
  loading: true,
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
    [signIn.pending]: (state) => {
      state.loading = true;
    },
    [signIn.fulfilled]: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
    },
    [signIn.rejected]: (state, action) => {
      state.isAuthenticated = false;
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { setUser, unsetUser } = authSlice.actions;
export default authSlice.reducer;

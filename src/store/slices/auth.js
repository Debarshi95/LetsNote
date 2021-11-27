/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  checkUserNameTaken,
  createUser,
  registerWithCredentials,
  signinWithCredentials,
  signout,
} from '../../services';

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

export const requestSignUp = createAsyncThunk(
  'auth/signup',
  async (inputData, { rejectWithValue }) => {
    try {
      const { email, password, username } = inputData;
      const userExists = await checkUserNameTaken(username);
      if (userExists) {
        throw new Error('Username already taken!!');
      }
      const res = await registerWithCredentials(email, password);
      if (res?.user) {
        const response = await createUser({ username, email, uid: res.user.uid });
        return response;
      }
      return res;
    } catch (error) {
      return rejectWithValue(error?.message);
    }
  }
);
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
      state.error = '';
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
    [requestSignUp.pending]: (state) => {
      state.loading = true;
      state.error = '';
    },
    [requestSignUp.fulfilled]: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
    },
    [requestSignUp.rejected]: (state, action) => {
      state.isAuthenticated = false;
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { setUser, unsetUser } = authSlice.actions;
export default authSlice.reducer;

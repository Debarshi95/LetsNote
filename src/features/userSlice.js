import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';
import { firestore } from '../firebase';

export const saveUserToDb = createAsyncThunk('user/saveUser', async ({ user, username }) => {
  const res = await firestore.collection('users').doc(user.uid).set({
    uid: user.uid,
    email: user.email,
    username,
    photoURL: user.photoURL,
    refreshToken: user.refreshToken,
  });

  return res;
});

export const getUserDataById = createAsyncThunk(
  'user/getUser',
  async (uid, { dispatch, getState }) => {
    const user = getState().user?.user;

    if (!user?.id) {
      const res = await firestore.collection('users').doc(uid).get();

      const userData = { id: res.id, ...user, ...res.data() };
      // eslint-disable-next-line no-use-before-define
      dispatch(setUser(userData));
    }
  }
);

export const checkIfUserNameTaken = (username) => async () => {
  try {
    const res = await firestore.collection('users').where('username', '==', username).get();

    return res.docs.length > 0;
  } catch (error) {
    throw Error(error);
  }
};
const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    setUser: (state, action) => {
      console.log('setUser Triggered');
      state.user = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;
const selectDomain = (state) => state.user;
export const selectUser = createSelector(selectDomain, (user) => {
  console.log('Select User called');
  return user;
});

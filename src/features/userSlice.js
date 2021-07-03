import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { firestore } from "../firebase";

export const saveUserToDb = createAsyncThunk(
  "user/saveUser",
  async ({ user, username }) => {
    const res = await firestore.collection("users").doc(user.uid).set({
      uid: user.uid,
      email: user.email,
      username: username,
      photoURL: user.photoURL,
      refreshToken: user.refreshToken,
    });

    return res;
  }
);

export const getUserDataById = createAsyncThunk(
  "user/getUser",
  async (uid, { dispatch, getState }) => {
    const user = getState().user?.user;

    if (!user?.id) {
      const res = await firestore.collection("users").doc(uid).get();

      const userData = { id: res.id, ...user, ...res.data() };
      dispatch(setUser(userData));
    }
  }
);

export const checkIfUserNameTaken = (username) => {
  return async () => {
    const res = await firestore
      .collection("users")
      .where("username", "==", username)
      .get();

    return res.docs.length > 0;
  };
};
const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
    loading: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;
export default userSlice.reducer;

export const selectUser = (state) => state.user;

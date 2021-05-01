import { createSlice } from "@reduxjs/toolkit";
import { firestore } from "../firebase";

export const saveUserToDb = (
  uid,
  fullname,
  email,
  username,
  photoURL,
  refreshToken
) => {
  return async () => {
    await firestore.collection("users").add({
      uid,
      fullname,
      email,
      username,
      photoURL,
      refreshToken,
    });
  };
};

export const getUserById = (uid) => {
  return async (dispatch) => {
    const res = await firestore
      .collection("users")
      .where("uid", "==", uid)
      .get();
    const user = { id: res.docs[0].id, ...res.docs[0].data() };
    dispatch(setUserActive({ user }));
  };
};

export const checkUsernameExists = (username) => {
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
  },
  reducers: {
    setUserActive: (state, action) => {
      const { payload } = action;

      state.user = {
        ...payload.user,
      };
      // console.log(state.user);
    },
    setUserInactive: (state) => {
      state.user = null;
      // console.log(state);
    },
  },
});

export const { setUserActive, setUserInactive } = userSlice.actions;
export default userSlice.reducer;

export const selectUser = (state) => state.user;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { auth, firestore, timeStamp } from "../firebase";

export const getAllNotesAsync = createAsyncThunk(
  "notes/getAllNotes",
  async ({ type }) => {
    const uid = auth?.currentUser?.uid;

    let includeTrashNotes = false;
    if (type === "GET_NOTES") {
      includeTrashNotes = false;
    } else {
      includeTrashNotes = true;
    }
    const res = await firestore
      .collection("notes")
      .where("moveToTrash", "==", includeTrashNotes)
      .where("user", "==", firestore.collection("users").doc(uid))
      .orderBy("lastEdited", "desc")
      .get();
    const docs = res.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    return docs;
  }
);

export const createNoteAsync = createAsyncThunk(
  "notes/createNote",
  async ({ title, content }) => {
    const { uid } = auth?.currentUser;

    const doc = await firestore.collection("notes").add({
      title: title || "Empty note",
      content: content,
      user: firestore.collection("users").doc(uid),
      moveToTrash: false,
      lastEdited: timeStamp(),
      createdAt: timeStamp(),
    });

    return doc.id;
  }
);

export const moveNoteToTrashAsync = (noteId) => async (dispatch) => {
  await firestore.collection("notes").doc(noteId).update({
    moveToTrash: true,
  });

  dispatch(getAllNotesAsync({ type: "GET_NOTES" }));
};

export const updateNoteAsync = createAsyncThunk(
  "notes/updateNote",
  async ({ noteId, _text, _title }) => {
    await firestore.collection("notes").doc(noteId).update({
      title: _title,
      content: _text,
      moveToTrash: false,
      lastEdited: timeStamp(),
    });
  }
);

export const deleteNoteAsync = (noteId) => {
  return async (dispatch) => {
    await firestore.collection("notes").doc(noteId).delete();
    dispatch(getAllNotesAsync());
  };
};
const notesSlice = createSlice({
  name: "notes",
  initialState: {
    notes: [],
    loading: true,
  },
  reducers: {
    setNotesEmpty: (state) => {
      state.notes = [];
    },
  },
  extraReducers: {
    [getAllNotesAsync.rejected]: (state, action) => {
      // console.log(action);
    },
    [getAllNotesAsync.pending]: (state) => {
      if (state.notes.length < 0) {
        state.loading = true;
      }
    },
    [getAllNotesAsync.fulfilled]: (state, action) => {
      state.loading = false;
      state.notes = [...action.payload];
    },
  },
});
export const { setNotes, setNotesEmpty } = notesSlice.actions;
export default notesSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import { firestore, timeStamp } from "../firebase";

export const getAllNotesAsync = (userId, type) => {
  return async (dispatch) => {
    let getTrashNotes = false;
    if (type === "notes") {
      getTrashNotes = false;
    } else {
      getTrashNotes = true;
    }
    const res = await firestore
      .collection("notes")
      .where("moveToTrash", "==", getTrashNotes)
      .where("user", "==", firestore.collection("users").doc(userId))
      .orderBy("lastEdited", "desc")
      .get();
    const docs = res.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    dispatch(setNotes({ docs }));
  };
};

export const createNoteAsync = ({ title, content, userId }) => {
  return async () => {
    const doc = await firestore.collection("notes").add({
      title: title || "Empty note",
      content: content,
      user: firestore.collection("users").doc(userId),
      moveToTrash: false,
      lastEdited: timeStamp(),
      createdAt: timeStamp(),
    });

    return doc.id;
  };
};

export const moveNoteToTrashAsync = (noteId, userId) => {
  return async (dispatch) => {
    await firestore.collection("notes").doc(noteId).update({
      moveToTrash: true,
    });
    dispatch(getAllNotesAsync(userId, "notes"));
  };
};

export const updateNoteAsync = (noteId, title, text) => {
  return async () => {
    await firestore.collection("notes").doc(noteId).update({
      title: title,
      content: text,
      lastEdited: timeStamp(),
    });
  };
};

export const deleteNoteAsync = (noteId, userId) => {
  return async (dispatch) => {
    await firestore.collection("notes").doc(noteId).delete();
    dispatch(getAllNotesAsync(userId, "trash"));
  };
};
const notesSlice = createSlice({
  name: "notes",
  initialState: {
    notes: [],
  },
  reducers: {
    setNotes: (state, action) => {
      state.notes = [...action.payload.docs];
    },
    setNotesEmpty: (state) => {
      state.notes = [];
    },
  },
});
export const { setNotes, setNotesEmpty } = notesSlice.actions;
export default notesSlice.reducer;

export const selectAllNotes = (state) => state.notes.notes;

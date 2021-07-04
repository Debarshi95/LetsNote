// import React from "react";
// import { auth, firestore, timeStamp } from "../firebase";

// const NotesContext = React.createContext();
// export const useNotesContext = () => React.useContext(NotesContext);

// function NotesProvider({ children }) {
//   const uid = auth?.currentUser?.uid;
//   const [notes, setNotes] = React.useState(null);
//   const [loading, setLoading] = React.useState(true);
//   const [error, setError] = React.useState(null);

//   const getAllNotes = async (type) => {
//     try {
//       let getTrashNotes = false;
//       if (type === "notes") {
//         getTrashNotes = false;
//       } else {
//         getTrashNotes = true;
//       }
//       const res = await firestore
//         .collection("notes")
//         .where("moveToTrash", "==", getTrashNotes)
//         .where("user", "==", firestore.collection("users").doc(uid))
//         .orderBy("lastEdited", "desc")
//         .get();
//       return res.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
//     } catch (error) {
//       throw error;
//     }
//   };

//   React.useEffect(() => {
//     getAllNotes("notes")
//       .then((data) => {
//         setNotes(data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         setError(err);
//         setLoading(false);
//       });
//   }, []);

//   const createNote = async ({ title, content }) => {
//     const doc = await firestore.collection("notes").add({
//       title: title || "Empty note",
//       content: content,
//       user: firestore.collection("users").doc(uid),
//       moveToTrash: false,
//       lastEdited: timeStamp(),
//       createdAt: timeStamp(),
//     });

//     return doc.id;
//   };

//   const moveToTrash = async (noteId) => {
//     try {
//       await firestore.collection("notes").doc(noteId).update({
//         moveToTrash: true,
//       });
//     } catch (error) {
//       throw error;
//     }
//   };

//   const updateNote = async (noteId, title, text) => {
//     console.log("updateasync called");
//     console.log(noteId);
//     console.log(title);
//     console.log(text);

//     await firestore.collection("notes").doc(noteId).update({
//       title: title,
//       content: text,
//       lastEdited: timeStamp(),
//     });
//   };

//   const deleteNote = async (noteId) => {
//     try {
//       await firestore.collection("notes").doc(noteId).delete();
//     } catch (error) {}
//   };
//   return (
//     <NotesContext.Provider
//       value={{
//         notes,
//         loading,
//         error,
//         getAllNotes,
//         updateNote,
//         createNote,
//         deleteNote,
//         moveToTrash,
//       }}
//     >
//       {children}
//     </NotesContext.Provider>
//   );
// }

// export default NotesProvider;

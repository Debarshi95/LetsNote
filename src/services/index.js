import strings from '../constant/strings';
import { firestore, auth, serverTimestamp } from '../firebase';

const registerWithCredentials = async (email, password) => {
  return auth.createUserWithEmailAndPassword(email, password);
};

const signinWithCredentials = async (email, password) => {
  return auth.signInWithEmailAndPassword(email, password);
};

const checkUserNameTaken = async (username) => {
  const res = await firestore
    .collection('users')
    .where('username', '==', username.toLowerCase())
    .get();

  if (res?.docs.length) {
    throw Error(strings.USERNAME_TAKEN);
  }
  return false;
};

const createUser = async ({ username, email, uid }) => {
  return firestore.collection('users').add({
    uid,
    username,
    email,
    provider: 'local',
    createdAt: serverTimestamp(),
  });
};

const getUserDataById = async (uid) => {
  return firestore.collection('users').doc(uid).get();
};

const signout = async () => auth.signOut();

const createNote = ({ userId, title, content }) => {
  return firestore.collection('notes').add({
    userId,
    title: title || 'New Note',
    content: content || '',
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
};

const deleteNote = async (noteId) => {
  return firestore.collection('notes').doc(noteId).delete();
};

const getNoteById = async (noteId) => {
  return firestore.collection('notes').doc(noteId).get();
};

const getNotes = async (userId) => {
  return firestore
    .collection('notes')
    .where('userId', '==', userId)
    .orderBy('createdAt', 'desc')
    .get();
};

const updateNote = async ({ noteId, userId, title, content }) => {
  return firestore.collection('notes').doc(noteId).update({
    userId,
    title,
    content,
    updatedAt: serverTimestamp(),
  });
};
export {
  checkUserNameTaken,
  createUser,
  registerWithCredentials,
  signinWithCredentials,
  signout,
  getUserDataById,
  createNote,
  deleteNote,
  getNoteById,
  getNotes,
  updateNote,
};

import strings from '../constant/strings';
import { firebase, serverTimestamp } from '../firebase';

const registerWithCredentials = async (email, password) => {
  return firebase.auth().createUserWithEmailAndPassword(email, password);
};

const signinWithCredentials = async (email, password) => {
  return firebase.auth().signInWithEmailAndPassword(email, password);
};

const checkUserNameTaken = async (username) => {
  const res = await firebase
    .firestore()
    .collection('users')
    .where('username', '==', username.toLowerCase())
    .get();

  if (res?.docs.length) {
    throw Error(strings.USERNAME_TAKEN);
  }
  return false;
};

const createUser = async ({ username, email, uid }) => {
  return firebase.firestore().collection('users').add({
    uid,
    username,
    email,
    provider: 'local',
    createdAt: serverTimestamp(),
  });
};

const getUserDataById = async (uid) => {
  return firebase.firestore().collection('users').doc(uid).get();
};

const signout = async () => firebase.auth().signOut();

const createNote = ({ uid, title, content }) => {
  return firebase
    .firestore()
    .collection('notes')
    .add({
      userId: uid,
      title: title || 'New Note',
      content: content || '',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
};

const deleteNote = async (noteId) => {
  return firebase.firestore().collection('notes').doc(noteId).delete();
};

const getNoteById = async (noteId) => {
  return firebase.firestore().collection('notes').doc(noteId).get();
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
};

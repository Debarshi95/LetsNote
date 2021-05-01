import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

var firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};
const app = firebase.initializeApp(firebaseConfig);
const firestore = app.firestore();
const auth = app.auth();
const googleProvider = new firebase.auth.GoogleAuthProvider();
const timeStamp = firebase.firestore.FieldValue.serverTimestamp;

const saveUser = async (uid, fullname, username, email) => {
  const res = await firestore.collection("users").add({
    uid,
    fullname,
    username,
    email,
    createdAt: timeStamp(),
  });
  return res;
};

export { firestore, auth, timeStamp, googleProvider, saveUser };

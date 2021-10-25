import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

const initFirebase = () => {
  if (!firebase.apps.length) {
    return firebase.initializeApp(firebaseConfig);
  }
  return firebase.app;
};

const app = initFirebase();

const { GoogleAuthProvider } = firebase.auth;
const { serverTimestamp } = firebase.firestore.FieldValue;

export { app as firebase, serverTimestamp, GoogleAuthProvider };

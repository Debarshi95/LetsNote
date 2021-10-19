import React from 'react';
import './App.css';
import { useDispatch } from 'react-redux';
import { ToastProvider } from 'react-toast-notifications';
import { auth } from './firebase';
import { setUser } from './features/userSlice';
import MainRouter from './MainRouter';

function App() {
  const dispatch = useDispatch();
  React.useEffect(() => {
    const unsub = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(
          setUser({
            uid: authUser.uid,
            email: authUser.email,
            displayName: authUser.displayName,
            refreshToken: authUser.refreshToken,
            photoURL: authUser.photoURL,
          })
        );
      } else {
        dispatch(setUser(null));
      }
    });
    return unsub;
  }, [dispatch]);

  return (
    <div className="app__root">
      <ToastProvider>
        <MainRouter />
      </ToastProvider>
    </div>
  );
}

export default App;

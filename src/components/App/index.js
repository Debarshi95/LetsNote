import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import { auth } from '../../firebase';
import MainRouter from '../MainRouter';
import './index.css';
import { setUser, unsetUser } from '../../store/slices/auth';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const unsub = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(setUser(authUser));
      } else {
        dispatch(unsetUser());
      }
    });
    return unsub;
  }, [dispatch]);

  return (
    <div className="app__root">
      <MainRouter />
      <Toaster />
    </div>
  );
}

export default App;

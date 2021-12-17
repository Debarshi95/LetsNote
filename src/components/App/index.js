import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import { auth } from '../../firebase';
import MainRouter from '../MainRouter';
import { setUser, unsetUser } from '../../store/slices/auth';

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const unsub = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        const { uid, email } = authUser;

        dispatch(setUser({ uid, email }));
      } else {
        dispatch(unsetUser());
      }
    });
    return unsub;
  }, [dispatch]);

  return (
    <>
      <MainRouter />
      <Toaster />
    </>
  );
}

export default App;

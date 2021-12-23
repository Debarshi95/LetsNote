import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import { auth } from '../../firebase';
import MainRouter from '../MainRouter';
import { setUser, unsetUser } from '../../store/slices/auth';

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const unsub = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        const user = { uid: authUser.uid, email: authUser.email };
        dispatch(setUser(user));
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
};

export default App;

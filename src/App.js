import React from "react";
import MainRouter from "./MainRouter";
import "./App.css";
import { auth } from "./firebase";
import { useDispatch } from "react-redux";
import { getUserById, setUserInactive } from "./features/userSlice";
import { ToastProvider } from "react-toast-notifications";

function App() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    const unsub = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        dispatch(getUserById(authUser.uid));
      } else {
        dispatch(setUserInactive());
      }
    });
    return () => unsub();
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

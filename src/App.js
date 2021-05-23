import React from "react";
import MainRouter from "./MainRouter";
import "./App.css";
import { auth } from "./firebase";
import { useDispatch } from "react-redux";
import { setUser } from "./features/userSlice";
import { ToastProvider } from "react-toast-notifications";

function App() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    const unsub = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        console.log("app js called");
        dispatch(setUser(authUser));
      } else {
        dispatch(setUser(null));
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

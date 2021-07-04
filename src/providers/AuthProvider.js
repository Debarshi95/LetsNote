import React from "react";
import { auth, firestore } from "../firebase";

const AuthContext = React.createContext();

export const useAuthContext = () => React.useContext(AuthContext);

function AuthProvider({ children }) {
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    const unsub = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });
    return unsub;
  }, []);

  const getUserObjById = React.useCallback(async (userId) => {
    try {
      const res = await firestore.collection("users").doc(userId).get();

      return { id: res.id, ...res.data() };
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, getUserObjById }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;

// import React from "react";
// import { auth, firestore } from "../firebase";

// function useAuth() {
//   const [userObj, setUserObj] = React.useState(null);
//   const [loading, setLoading] = React.useState(true);
//   const { uid } = auth?.currentUser;
//   const getUserObjById = React.useCallback(async () => {
//     try {
//       const res = await firestore.collection("users").doc(uid).get();

//       setUserObj({ id: res.id, ...res.data() });
//     } catch (error) {
//       console.log(error);
//     }
//   }, [uid]);
//   const createUser = async () => {};
//   return {
//     userObj,
//     getUserObjById,
//   };
// }

// export default useAuth;

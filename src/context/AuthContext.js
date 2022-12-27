import { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../firebase";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
//import {setDoc,doc} from 'firebase/firestore'

const AuthContext = createContext();

function AuthContextProvider({ children }) {
  const [user, setUser] = useState({});

  const signUp = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const logIn = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };
  const logOut = () => {
    return signOut(auth);
  };

  const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });
  useEffect(() => {
    unsubscribe();
  });

  return <AuthContext.Provider value={{
    user,
    signUp,
    logIn,
    logOut

  }}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;

export const UserAuth = () => {
  return useContext(AuthContext);
};

// src/context/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, provider } from "../firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";


const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem("dd_user");
    return stored ? JSON.parse(stored) : null;
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        const userData = {
          name: firebaseUser.displayName || "",
          email: firebaseUser.email,
          uid: firebaseUser.uid,
        };
        setUser(userData);
        localStorage.setItem("dd_user", JSON.stringify(userData));
      } else {
        setUser(null);
        localStorage.removeItem("dd_user");
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const login = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);

  const signup = (email, password, name) =>
    createUserWithEmailAndPassword(auth, email, password);

  const loginWithGoogle = () => signInWithPopup(auth, provider);

  const logout = () => signOut(auth);

  return (
    <AuthContext.Provider
      value={{ user, login, signup, loginWithGoogle, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

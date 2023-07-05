import React, { createContext, useContext, useEffect, useState } from "react";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

// Create an authentication context
const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  // State to hold the user object
  const [user, setUser] = useState(null);

  // Function to sign up a user with email and password
  const signUp = async (email, password) => {
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);

      // Set the 'users' document with the user's ID
      await setDoc(doc(db, 'users', email), {
        savedShows: []
      });

      // Update the user state
      setUser(user);

    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  // Function to sign in a user with email and password
  const signIn = async (email, password) => {
    try {
      const { user } = await signInWithEmailAndPassword(auth, email, password);

      // Update the user state
      setUser(user);
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  // Function to sign out the currently logged-in user
  const logOut = async () => {
    try {
      await signOut(auth);

      // Update the user state
      setUser(null);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  // useEffect hook to listen for changes in the authentication state
  useEffect(() => {
    // Set up the listener with onAuthStateChanged
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      // Update the user state when the authentication state changes
      setUser(currentUser);
    });

    // Clean up the listener when the component unmounts
    return () => {
      unsubscribe();
    };
  }, []);

  //Create the authentication context value
  const authContextValue = {
    user,
    signUp,
    signIn,
    logOut,
  };

  // Provide the authentication context to the children components
  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to access the authentication context
export function useAuth() {
  return useContext(AuthContext);
}

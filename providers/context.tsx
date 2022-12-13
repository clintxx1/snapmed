import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../lib/firebase";

const AuthContext = createContext<any>({});
export default AuthContext

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }: any) => {
  const [currentUser, setCurrentUser] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);

  const signup = (email: string, password: string) => {
    return auth.createUserWithEmailAndPassword(email, password);
  }

  const login = (email: string, password: string) => {
    return auth.signInWithEmailAndPassword(email, password);
  }

  const logout = () => {
    return auth.signOut();
  }

  const resetPassword = (email: string) => {
    return auth.sendPasswordResetEmail(email);
  }

  const updateEmail = (email: string) => {
    return currentUser.updateEmail(email);
  }

  const updatePassword = (password: string) => {
    return currentUser.updatePassword(password);
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user: any) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const ScreenContext = createContext<any|null>(null);

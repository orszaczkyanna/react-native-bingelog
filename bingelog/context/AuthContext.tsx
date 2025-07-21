// Stores Access Token and User ID in memory for the current session, using React Context
// Used to access protected routes and make authorized API requests
// This data is not persistent — it is lost when the app restarts

import React, { createContext, useContext, useState } from "react";

// 1. Define types for the context
interface AuthContextType {
  accessToken: string | null;
  userId: string | null;
  setSessionAuth: (token: string, userId: string) => void;
  clearSessionAuth: () => void;
}

// 2. Create the context (with a default value of undefined)
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 3. Custom hook to use the AuthContext
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within AuthProvider");
  }
  return context;
};

// 4. Create a provider component
// This component will wrap the part of the app that needs access to the auth context
const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  // Set authentication state (store access token and user ID in memory for authenticated access)
  const setSessionAuth = (token: string, userId: string) => {
    setAccessToken(token); // Required to access protected routes and make authorized API requests
    setUserId(userId); // Identifies the logged-in user

    console.log(`Session started: ID${userId} with accessToken ${token}`);
  };

  // Clear the authentication state (remove auth data from memory to end session)
  const clearSessionAuth = () => {
    setAccessToken(null);
    setUserId(null);
  };

  // Provide the context value to children components
  return (
    <AuthContext.Provider
      value={{ accessToken, userId, setSessionAuth, clearSessionAuth }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

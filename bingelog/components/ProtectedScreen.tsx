// Screen Wrapper to block access to children if user is not logged in
// Redirects unauthenticated users to the login screen and prevents rendering of protected content

import React, { useEffect } from "react";
import { useRouter } from "expo-router";
import { useAuthContext } from "@/context/AuthContext";

const ProtectedScreen = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  const { accessToken } = useAuthContext();

  // EFFECT
  // Redirect to login screen if accessToken is missing
  useEffect(() => {
    if (!accessToken) {
      router.replace("/log-in");
    }
  }, [accessToken]); // runs once on mount and again whenever accessToken changes

  // RENDERING LOGIC
  // If accessToken is not available, do not render children
  if (!accessToken) return null;

  // Render protected content (if accessToken is available)
  return <>{children}</>;
};

export default ProtectedScreen;

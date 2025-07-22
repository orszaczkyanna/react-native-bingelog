// Redirect hook to prevent logged-in users from accessing public screens (e.g., log-in, sign-up)

import { useEffect } from "react";
import { useRouter } from "expo-router";
import { useAuthContext } from "@/context/AuthContext";

export const useRedirectIfAuthenticated = () => {
  const { accessToken } = useAuthContext();
  const router = useRouter();

  // Redirect to home screen if user is already authenticated
  useEffect(() => {
    if (accessToken) {
      router.replace("/home");
    }
  }, [accessToken]);
};

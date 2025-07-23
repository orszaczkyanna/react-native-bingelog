// Handles access token renewal using refresh token stored in SecureStore

import api from "@/lib/axios";
import { getRefreshToken, deleteRefreshToken } from "@/lib/secureStore";

/**
 * Attempts to refresh the access token using the stored refresh token.
 * Returns a new access token if successful, or null if refresh failed.
 */
export const refreshAccessToken = async (): Promise<string | null> => {
  try {
    const storedRefreshToken = await getRefreshToken();

    // If no refresh token is stored (e.g. user logged out), don't attempt to refresh the access token
    if (!storedRefreshToken) {
      return null;
    }

    // Send refresh request to backend
    const response = await api.post("/auth/refresh", {
      refreshToken: storedRefreshToken,
    });

    // Extract new access token from response
    const { accessToken } = response.data;

    // Return new token if present, otherwise return null
    return accessToken || null;
  } catch (err: any) {
    // If refresh fails (e.g. token expired), delete invalid refresh token
    await deleteRefreshToken();
    console.error("Token refresh failed:", err.message);
    return null;
  }
};

// SecureStore utilities for managing REFRESH TOKEN securely in local storage

import * as SecureStore from "expo-secure-store";

// Key for storing the refresh token
const SECURE_STORE_REFRESH_TOKEN_KEY = "refreshToken";

// Save the refresh token securely
export const saveRefreshToken = async (token: string) => {
  await SecureStore.setItemAsync(SECURE_STORE_REFRESH_TOKEN_KEY, token);
};

// Get the stored refresh token (or null if not found)
export const getRefreshToken = async (): Promise<string | null> => {
  return await SecureStore.getItemAsync(SECURE_STORE_REFRESH_TOKEN_KEY);
};

// Delete the stored refresh token
export const deleteRefreshToken = async () => {
  await SecureStore.deleteItemAsync(SECURE_STORE_REFRESH_TOKEN_KEY);
};

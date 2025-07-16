import "../global.css"; // Import global Tailwind CSS classes
// Required once to inject Tailwind layers (base, components, utilities)
import React from "react";
import { Platform } from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import * as NavigationBar from "expo-navigation-bar";
import { Stack } from "expo-router";
import Colors from "@/constants/Colors";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const RootLayout = () => {
  // Load custom fonts using Expo's useFonts hook
  const [loaded, error] = useFonts({
    "Nunito-Sans-Regular": require("@/assets/fonts/Nunito-Sans-Regular.ttf"),
    "Nunito-Sans-SemiBold": require("@/assets/fonts/Nunito-Sans-SemiBold.ttf"),
    "Nunito-Sans-Bold": require("@/assets/fonts/Nunito-Sans-Bold.ttf"),
    "Raleway-Bold": require("@/assets/fonts/Raleway-Bold.ttf"),
  });

  useEffect(() => {
    // Hide splash screen once fonts are loaded or if an error occurs
    if (loaded || error) {
      if (error) console.log(error);
      SplashScreen.hideAsync();

      // Configure the system navigation bar (Android only)
      // Sets background color and ensures light icons
      if (Platform.OS === "android") {
        NavigationBar.setBackgroundColorAsync(Colors.background.primary);
        NavigationBar.setButtonStyleAsync("light");
      }
    }
  }, [loaded, error]);

  // Skip rendering until fonts are loaded or an error occurs
  if (!loaded && !error) {
    return null;
  }

  return (
    <>
      {/* Use screenOptions on <Stack> to apply settings to all screens (e.g. hide headers) */}
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(tabs)" />
      </Stack>
      {/* Global StatusBar configuration for the entire application */}
      <StatusBar style="light" backgroundColor={Colors.background.primary} />
    </>
  );
};

export default RootLayout;

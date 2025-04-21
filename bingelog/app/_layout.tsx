import "../global.css"; // Import global Tailwind CSS classes
// Required once to inject Tailwind layers (base, components, utilities)
import React from "react";
import { View, Text } from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

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
    }
  }, [loaded, error]);

  // Skip rendering until fonts are loaded or an error occurs
  if (!loaded && !error) {
    return null;
  }

  return (
    // Temporary layout test to verify Tailwind styles and custom fonts
    <View className="bg-background flex-1 justify-center items-center">
      <Text className="text-foreground font-nunitoRegular">RootLayout</Text>
    </View>
  );
};

export default RootLayout;

// ScreenWrapper applies consistent styling to individual screens

import React, { ReactNode } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ScreenWrapper = ({ children }: { children: ReactNode }) => {
  return (
    // Outer View sets the base background and ensures full height
    <View className="flex-1 bg-background">
      {/* SafeAreaView keeps content away from notches/status bars */}
      <SafeAreaView className="flex-1 justify-center items-center">
        {children}
      </SafeAreaView>
    </View>
  );
};

export default ScreenWrapper;

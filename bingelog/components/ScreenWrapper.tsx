// ScreenWrapper applies consistent styling to individual screens

import React, { ReactNode } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface Props {
  children: ReactNode;
  centered?: boolean;
  className?: string;
}

const ScreenWrapper = ({
  children,
  centered = false,
  className = "",
}: Props) => {
  return (
    // Outer View sets the base background and ensures full height
    <View className={`flex-1 bg-background py-8 px-4 ${className}`}>
      {/* SafeAreaView keeps content away from notches/status bars */}
      <SafeAreaView
        className={`flex-1 ${centered ? "justify-center items-center" : ""}`}
      >
        {children}
      </SafeAreaView>
    </View>
  );
};

export default ScreenWrapper;

// AppWrapper is used once around the entire app

import React, { ReactNode } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

import Colors from "@/constants/Colors";

const AppWrapper = ({ children }: { children: ReactNode }) => {
  return (
    // Outer View sets the base background and ensures full height
    <View className="flex-1 bg-background">
      {/* SafeAreaView keeps content away from notches/status bars */}
      <SafeAreaView className="flex-1 justify-center items-center">
        {/* Global StatusBar configuration for the entire application */}
        <StatusBar style="light" backgroundColor={Colors.background.primary} />
        {children}
      </SafeAreaView>
    </View>
  );
};

export default AppWrapper;

// Displays a circular loading indicator with text label

import React from "react";
import { View, Text, ActivityIndicator } from "react-native";
import Colors from "@/constants/Colors";

const LoadingIndicator = () => {
  return (
    <View className="layout-flex-center">
      <ActivityIndicator size="large" color={Colors.accent} />
      <Text className="text-foreground mt-2">Loading...</Text>
    </View>
  );
};

export default LoadingIndicator;

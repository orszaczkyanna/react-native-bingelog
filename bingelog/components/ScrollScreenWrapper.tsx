// ScrollScreenWrapper provides scrollable layout for static screens like onboarding or forms

import React from "react";
import { ScrollView, View } from "react-native";

interface Props {
  children: React.ReactNode;
  viewClassName?: string;
}

const ScrollScreenWrapper = ({ children, viewClassName }: Props) => {
  return (
    //  Use ScrollView for static, short content like onboarding or forms
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      style={{ width: "100%" }}
    >
      {/* Inner View to apply styles — ScrollView doesn't fully support Tailwind styling */}
      <View className={`w-full min-h-[85vh] items-center ${viewClassName}`}>
        {children}
      </View>
    </ScrollView>
  );
};

export default ScrollScreenWrapper;

// ----- ScrollView style and contentContainerStyle -----
// `contentContainerStyle` controls the scrollable CONTENT inside ScrollView
//    - flexGrow: 1 allows ScrollView content to expand and scroll naturally
//    - height: "100%" can break scrolling
// `style` applies to the ScrollView container ITSELF
//    - width: "100%" makes ScrollView fill parent width; without it, layout shrinks to content

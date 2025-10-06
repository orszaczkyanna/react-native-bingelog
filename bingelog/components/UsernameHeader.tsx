// Shows the app icon and the current username

import React from "react";
import { View, Text, Image } from "react-native";
import { useAuthContext } from "@/context/AuthContext";
import images from "@/constants/images";

const UsernameHeader = () => {
  const { username } = useAuthContext();

  // Use a safe fallback during development if no one is logged in
  const safeUsername = username ?? "Username";

  return (
    <View className="w-[90vw] flex-row items-center justify-start gap-1 py-2">
      {/* App icon */}
      <Image
        source={images.logoIcon}
        className="h-7 w-7"
        resizeMode="contain"
      />

      {/* Username */}
      <Text
        className="text-foreground font-nunitoBold text-2xl"
        numberOfLines={1}
        ellipsizeMode="tail" // truncate end
      >
        {safeUsername}
      </Text>
    </View>
  );
};

export default UsernameHeader;

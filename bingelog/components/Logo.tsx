import React from "react";
import { Image, View } from "react-native";
import images from "@/constants/images";

const Logo = () => {
  return (
    <View className="w-full">
      <Image
        source={images.logo}
        resizeMode="contain"
        className="self-start w-52 h-11 "
      />
    </View>
  );
};

export default Logo;

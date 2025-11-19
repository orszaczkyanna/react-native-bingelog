// Shows an illustration and an error message, optionally with a button

import React from "react";
import { View, Text, Image } from "react-native";
import images from "@/constants/images";
import CTAButton from "./CTAButton";

interface Props {
  title: string;
  subtitle: string;
  buttonTitle?: string;
  onPress?: () => void;
}

const ErrorState = ({ title, subtitle, buttonTitle, onPress }: Props) => {
  return (
    <View className="h-[50vh] items-center justify-center">
      {/* Illustration */}
      <Image
        source={images.errorState}
        className="w-72 h-72"
        resizeMode="contain"
      />

      {/* Text content */}
      <View className="items-center">
        <Text className="text-foreground font-nunitoBold text-xl text-center">
          {title}
        </Text>
        <Text className="text-foreground-secondary font-nunitoRegular text-base text-center">
          {subtitle}
        </Text>
      </View>

      {/* Optional CTA button */}
      {buttonTitle && onPress && (
        <CTAButton
          title={buttonTitle}
          onPress={onPress}
          pressableClassName="mt-8"
        />
      )}
    </View>
  );
};

export default ErrorState;

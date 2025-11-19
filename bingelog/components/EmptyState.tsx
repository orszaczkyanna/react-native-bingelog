// Shows an empty state message, optionally with illustration and button

import React from "react";
import { View, Text, Image } from "react-native";
import images from "@/constants/images";
import CTAButton from "./CTAButton";

interface Props {
  title: string;
  subtitle: string;
  buttonTitle?: string;
  onPress?: () => void;
  showIllustration?: boolean;
}

const EmptyState = ({
  title,
  subtitle,
  buttonTitle,
  onPress,
  showIllustration = false,
}: Props) => {
  return (
    <View className="h-[50vh] items-center justify-center">
      {/* Optional illustration */}
      {showIllustration && (
        <Image
          source={images.emptyState}
          className="w-64 h-64"
          resizeMode="contain"
        />
      )}

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

export default EmptyState;

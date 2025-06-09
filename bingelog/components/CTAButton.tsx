import React from "react";
import { Pressable, Text } from "react-native";

interface Props {
  title: string;
  onPress: () => void;
  isLoading?: boolean;
  pressableClassName?: string;
}

const CTAButton = ({
  title,
  onPress,
  isLoading,
  pressableClassName,
}: Props) => {
  return (
    <Pressable
      className={`bg-accent min-h-16 w-[90vw] rounded-md justify-center items-center active:opacity-70 ${
        isLoading ? "opacity-50" : ""
      } ${pressableClassName}`}
      onPress={onPress}
      disabled={isLoading}
    >
      <Text className="font-nunitoBold text-background text-2xl">{title}</Text>
    </Pressable>
  );
};

export default CTAButton;

import React from "react";
import { Pressable, Text } from "react-native";

interface CTAButtonProps {
  title: string;
  onPress: () => void;
  pressableClassName?: string;
}

const CTAButton = ({ title, onPress, pressableClassName }: CTAButtonProps) => {
  return (
    <Pressable
      onPress={onPress}
      className={`bg-accent min-h-16 w-[90vw] rounded-md justify-center items-center active:opacity-70 ${pressableClassName}`}
    >
      <Text className="font-nunitoBold text-background text-2xl">{title}</Text>
    </Pressable>
  );
};

export default CTAButton;

// Button with variant-based styling for common actions

// - neutral (gray): default; use for safe, secondary actions (e.g., cancel, back, skip)
// - danger (red): use for destructive actions with irreversible effects (e.g., delete, remove, report)
// - confirm (accent): use for positive actions that move forward (e.g., save, add, confirm)

import React from "react";
import { Pressable, Text } from "react-native";

// Define the available button variant types
type ButtonVariant = "neutral" | "danger" | "confirm";

// Props for the component
interface Props {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  isLoading?: boolean;
  pressableClassName?: string;
}

// Map each variant to its corresponding styling classes
const buttonVariantClasses: Record<
  ButtonVariant,
  { variantPressableClass: string; variantTextClass: string }
> = {
  neutral: {
    variantPressableClass: "bg-background-button",
    variantTextClass: "text-foreground-secondary",
  },
  danger: {
    variantPressableClass: "bg-danger",
    variantTextClass: "text-background",
  },
  confirm: {
    variantPressableClass: "bg-accent",
    variantTextClass: "text-background",
  },
};

const SecondaryButton = ({
  title,
  onPress,
  variant = "neutral",
  isLoading,
  pressableClassName,
}: Props) => {
  // Get the styling classes based on the selected variant
  const { variantPressableClass, variantTextClass } =
    buttonVariantClasses[variant];

  return (
    <Pressable
      className={`px-6 min-h-11 min-w-[34vw] rounded-md justify-center items-center active:opacity-70 ${
        isLoading ? "opacity-50" : ""
      } ${variantPressableClass} ${pressableClassName}`}
      onPress={onPress}
      disabled={isLoading}
    >
      <Text className={`font-nunitoBold text-lg ${variantTextClass}`}>
        {title}
      </Text>
    </Pressable>
  );
};

export default SecondaryButton;

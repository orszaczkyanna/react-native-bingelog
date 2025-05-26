import React from "react";
import { Text } from "react-native";
import { Link } from "expo-router";
import type { LinkProps } from "expo-router"; // Type-only import ensures this is removed at compile time (no runtime impact)

interface Props {
  message: string;
  linkText: string;
  linkHref: LinkProps["href"]; // Ensures only valid route strings can be passed to the href prop
}

const AuthRedirectPrompt = ({ message, linkText, linkHref }: Props) => {
  return (
    <Text className="text-foreground-secondary font-nunitoRegular text-lg">
      {message}{" "}
      <Link href={linkHref} className="text-accent">
        {linkText}
      </Link>
    </Text>
  );
};

export default AuthRedirectPrompt;
